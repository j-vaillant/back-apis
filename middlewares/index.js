const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1]; // Récupère le JWT après "Bearer"
    req.token = token; // Stocke le token dans req pour utilisation ultérieure
    next();
  } else {
    res.status(401).json({ message: "Token manquant ou non valide" });
  }
};

module.exports.jwtMiddleware = jwtMiddleware;
