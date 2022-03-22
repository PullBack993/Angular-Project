const { create, getById, deleteById, updateById, likeAd, sortByDate, sortByLikes, getLast } = require('../services/home');
const { homeInputParser } = require('../helpers/inputParser');
const { s3UploadImg } = require('../helpers/s3Upload');

const router = require('express').Router();

/* TODO check how can I take info from Angular(JWT) */ 
router.post('/create', s3UploadImg(), async(req, res) => {
    try {
        req.body.imageUrls = req.files.map(img => img.location)

        const data = homeInputParser(req)
        data.owner = req.params.id 
        data.date = (new Date()).getTime()
        const createdData = await create(data)

        res.status(201).send({success: true, message: 'Successfully uploaded ' + req.files.length + ' files!', createdData })
        
    } catch (err) {
        return res.status(400).json({success:false, err:err.message ,message: "Ad cannot be created!"})
    };
});
//TODO check out on pagination!!!!
router.get('/catalog/:limit', async (req, res) => {
    try {
        const data = await getLast( Number(req.query.limit));
        res.status(200).send({message: 'success', data })
        
    } catch (err) {
        res
          .status(400)
          .json({
            success: false,
            err: err.message,
            message: "Cannot get items",
            function: "GET -> catalog",
          });
    };
});

// router.get('/catalog/:limit', async (req, res) => {
//     try {
//         const data = await getLast( Number(req.query.limit));
//         res.status(200).send({message: 'success', data })
        
//     } catch (err) {
//         res.status(400).send({success: false, err:err.message ,message:"Cannot get items", function: "GET -> catalog" });
//     };
// });

router.get('/details/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await getById(id)
        res.status(200).send({success: true, message: "success", data })
        
    } catch (err) {
        res
          .status(400)
          .json({
            success: false,
            err: err.message,
            message: `Cannot get item with id ${id}!`,
            function: "GET -> details/:id",
          });
    };
});

//TODO after front end is createt,check if owner (all)
router.delete('/delete/:id',/*isOwner() */ async (req, res) => {
    try {
        await deleteById(req.params.id)
        res.status(200).send({success: true, message: "success" })
        
    } catch (err) {
        res
          .status(400)
          .json({
            success: false,
            err: err.message,
            message: "Category not found!",
          });
    };
});

//TODO after front end is createt,check if owner (all)
router.get('/edit/:id',/*isOwner() */  async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getById(id);
        res.status(200).send({ success: true, data, message: "success" })
        
    } catch (err) {
        res
          .status(400)
          .json({
            success: false,
            err: err.message,
            message: "Cannot get edit!",
          });
    };
});

router.put('/edit/:id',/*isOwner() */  async (req, res) => {
    try {
        const updateData = homeInputParser(req)
        const id = req.params.id
        const data = await updateById(id, updateData)
        res.status(200).send({success: true, data, message: "success" })

    } catch (err) {
        res.status(400).json({success: false, err:err.message, message: "Cannot edit!"});
    };
});

//TODO implement it correktly
router.get('/like/:id',/*isOwner() */  async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.id

    } catch (err) {
        console.log(err)
    }
});

//TODO implement it correktly
router.get('/sort-likes', async (req, res) => {
    try {
        const home = await sortByLikes();

    } catch (err) {
        console.log(err)
    }
});

module.exports = router;