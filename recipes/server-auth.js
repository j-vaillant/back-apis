const express = require("express");
const app = express();
const { connectToDatabase, MONGO_URI } = require("./utils/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const { saveSession } = require("./utils/session");
const jwt = require("jsonwebtoken");
const { jwtMiddleware } = require("./middlewares/index");

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// should be to middleware just after cors
app.use(
  session({
    name: "vinci-token",
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
    }),
    cookie: {
      maxAge: 180 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    },
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

connectToDatabase();

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erreur lors de la destruction de la session:", err);
      return res
        .status(500)
        .json({ message: "Erreur interne lors de la déconnexion" });
    }
    res.clearCookie("vinci-token");
    return res.status(200).json({ message: "Déconnexion réussie" });
  });
});

app.post("/auth", async (req, res) => {
  const { login, pwd, authMode } = req.body;
  let jwtToken = {};

  try {
    const hashedPwd = await bcrypt.hash(pwd, process.env.SECRET);
    const user = await User.findOne({ login, pwd: hashedPwd });

    if (!user) {
      return res.status(401).json({ success: false });
    }

    const payload = {
      id: user.id,
      startedAt: new Date().toISOString(),
      login: user.login,
      role: user.role,
    };

    if (authMode === "session") {
      req.session.user = payload;

      console.log("session created");

      await saveSession(req);
    }

    if (authMode === "jwt") {
      jwtToken = jwt.sign(payload, process.env.SECRET);
    }

    return res
      .status(200)
      .json({ success: true, ...(authMode === "jwt" && { jwtToken }) });
  } catch (e) {
    res.send(500, e.message);
  }
});

// GET user info
app.get("/user", (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  return res.status(401).send("user not authenticated");
});

// Protected root using jwt
app.get("/secure/jwt", jwtMiddleware, (req, res) => {
  try {
    jwt.verify(req.token, process.env.SECRET);

    res.send("ok");
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
});

//Protected root using session for admin role
app.get("/secure/session/admin", async (req, res) => {
  if (req.session?.user && req.session?.user?.role === "admin") {
    // user correctly logged
    res.send("ok");
  } else {
    res.status(500).send("not allowed");
  }
});

//Protected root using session for admin role
app.get("/secure/session/user", async (req, res) => {
  if (req.session?.user && req.session?.user?.role === "user") {
    // user correctly logged
    res.send("ok");
  } else {
    res.status(500).send("not allowed");
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
