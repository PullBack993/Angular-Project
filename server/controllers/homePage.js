const { getLastTree, getLast, search } = require('../services/home');
const { searchInputParser } = require('../helpers/inputParser')

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const projects = await getLastTree();
        const limit = Number(req.params.limit) || 0; // TODO check params or query
        
        const lastAd = await getLast(limit)
        res.status(200).json({message: "success", ads:lastAd, latestProject : projects});
        
    } catch (err) {
        console.log(err)
        res.status(500).json({err:err.message,message: "Internal server error"});
    }
});

router.get('/search', async (req, res) => {
    const input = searchInputParser(req)

    try {
        const data = await search(input) || [];
        res.status(200).json({ message: "success", data })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({err:err.message, message: "Internal server error" });
    }
});

module.exports = router;