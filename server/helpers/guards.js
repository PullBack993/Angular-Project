const { getById } = require("../services/home");
const expressJwt = require("express-jwt");
require("dotenv/config");

//Modify it !
function isOwner() {
  return async (req, res, next) => {
    const id = req.params.id;
    if (id) {
      try {
        const trip = await getById(id);
        if (
          req.session.user &&
          trip &&
          trip.owner._id == req.session.user._id
        ) {
          next();
        } else {
          res.redirect("/login");
        }
      } catch (err) {
        console.log(err);
        res.redirect("/login");
      }
    }
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
      { url: /(.*)/ },
      // { url: /\/api\/details\/(.*)/, methods: ["GET", "OPTIONS"] },
      // { url: /\/api\/catalog\/(.*)/, method: ["GET", "OPTIONS"] },
      // { url: /\/api\/home\/search\/(.*)/, method: ["GET", "OPTION"] },
      // { url: "/api/home", method: ["GET", "OPTION"] },
      // `/api/login`,
      // `/api/register`,
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
};
