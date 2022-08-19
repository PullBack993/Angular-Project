const expressJwt = require("express-jwt");
const { getById } = require("../services/home");
require("dotenv/config");

function isOwner() {
  return async (req, res, next) => {
    const id = req.params.id;
    if (id && req.user) {
      try {
        const findAd = await getById(id);
        if (findAd) {
          if (req.user._id && findAd.owner == req.user._id) {
            return next();
          } else {
            res.status(401).send("Unauthorized");
          }
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
      // For devolpment ==> All paths allow { url: /(.*)/ },
      { url: /\/api\/details\/(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/catalog\/(.*)/, method: ["GET", "OPTIONS"] },
      { url: /\/api\/home\/(.*)/, method: ["GET", "OPTION"] },
      { url: "/api/home", method: ["GET", "OPTION"] },
      `/api/home/search`,
      `/api/login`,
      `/api/register`,
      "/",
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
