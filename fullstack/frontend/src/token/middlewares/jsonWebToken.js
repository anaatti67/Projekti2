const jwt = require("jsonwebtoken")
const config = require("../../database/authConfig")
const db = require("../models/index")
const User = db.user

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"]

  if (!token) {
    return res.status(403).send({
      message: "Kirjautuminen epäonnistui!"
    })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Evätty!"
      });
    }
    req.userId = decoded.id;
    next()
  })
}

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next()
          return
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      })
      return
    })
  })
}




const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin
}
module.exports = authJwt