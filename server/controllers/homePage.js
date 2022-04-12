const { getLastTree, getLatest, search } = require("../services/home");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const projects = await getLastTree();
    const limit = 3; 

    const lastAd = await getLatest(limit);
    res.status(200).send({
      message: "success",
      latestAds: lastAd,
      latestProjects: projects,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err: err.message, message: "Internal server error" });
  }
});

router.post("/search", async (req, res) => {
  try {
    const query = Object.entries(req.body).reduce((accObj, [key, value]) => {
      if (value !== undefined && value !== null) {
        if (key == "price") {
          accObj[key] = { $lte: Number(value) };
        } else if (key == "area") {
          accObj[key] = { $gte: Number(value) };
        } else {
          accObj[key] = value;
        }
      }
      return accObj;
    }, {});

    const data = await search(query);
    res.status(200).send({ message: "success", data });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err: err.message, message: "Internal server error" });
  }
});

module.exports = router;
