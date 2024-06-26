const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.token;

  if (token) {
    const authToken = token.split(" ")[1];

    try {
      const decoded = jwt.verify(authToken, process.env.SECRET_KEY);
      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({ message: "invalid token" });
    }
  } else {
    return res.status(401).json({ message: "invalid token" });
  }
}

function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin === true) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "you are not allowed only admin" });
    }
  });
}

function verifyTokenAndEditUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res.status(403).json({ message: "you are not allowed" });
    }
  });
}

function verifyTokenAndAuth(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "your not allowed" });
    }
  });
}

module.exports = {
  verifyTokenAndAdmin,
  verifyTokenAndEditUser,
  verifyToken,
  verifyTokenAndAuth,
};
