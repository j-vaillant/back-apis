const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

require("dotenv").config();

const GoogleStrategy = require("passport-google-oauth2").Strategy;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize()); // init passport on every route call
app.use(passport.session());

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

authUser = (request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
};

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
      passReqToCallback: true,
    },
    authUser
  )
);

passport.serializeUser((user, done) => {
  console.log(`\n--------> Serialize User:`);
  console.log(user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("\n--------- Deserialized User:");
  console.log(user);
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    prompt: "select_account",
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: true }), // session:true permet de garder la session utilisateur
  (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect("http://localhost:3000/secureSSO");
    } else {
      res.redirect("http://localhost:3000/loginSSO");
    }
  }
);

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("http://localhost:3000/loginSSO");
};

app.get("/user", checkAuthenticated, (req, res) => {
  res.json(req.user);
});

app.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      console.log(`-------> User Logged out`);
      res.redirect("http://localhost:3000/loginSSO");
    });
  });
});

//Start the NODE JS server
app.listen(3001, () => console.log(`Server started on port 3001...`));
