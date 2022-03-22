const { getLastTree, getLatest, search } = require("../services/home");

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const projects = await getLastTree();
        const limit = 3; // TODO promis all ?
        
        const lastAd = await getLatest(limit);
        res
          .status(200)
          .send({
            message: "success",
            latestAds: lastAd,
            latestProjects : projects,
          });
        
    } catch (err) {
        console.log(err)
        res.status(500).json({err:err.message,message: "Internal server error"});
    }
});

router.get('/search', async (req, res) => {
    const input = searchInputParser(req)

    try {
        const data = await search(input) || [];
        res.status(200).send({ message: "success", data })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({err:err.message, message: "Internal server error" });
    }
});

module.exports = router;