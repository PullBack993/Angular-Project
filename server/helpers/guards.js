const expressJwt = require("express-jwt");
require("dotenv/config");

//Modify it !
function isOwner() {
  return (req, res, next) => {
    const id = req.params.id;
    if (id && req.user) {
      try {
        if (req.user._id  && (req.body.owner == req.user._id)) {
          next();
        } else {
          res.status(401).send("Unauthorized");
        }
      } catch (err) {
        res.status(401).send(err);
      }
    }
    res.status(401).send("Not found or unauthorized");
  };
}


function authJwt() {
  const secret = process.env.TOKEN_SECRET;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      // For all path/methods(dev)
      // { url: /(.*)/ },
      { url: /\/api\/details\/(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/catalog\/(.*)/, method: ["GET", "OPTIONS"] },
      { url: /\/api\/home\/search\/(.*)/, method: ["GET", "OPTION"] },
      { url: "/api/home", method: ["GET", "OPTION"] },
      `/api/login`,
      `/api/register`,
    ],
  });
}

//TODO admin panel methods
async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}

module.exports = {
  authJwt,
  isOwner,
};
