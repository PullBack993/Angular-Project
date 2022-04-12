const {
  create,
  getById,
  deleteById,
  updateById,
  likeAd,
  sortByDate,
  sortByLikes,
  getAll,
  getNewProjects,
  getRetailOutlet,
} = require("../services/home");
const { homeInputParser } = require("../helpers/inputParser");
const { s3UploadImg, s3Delete } = require("../helpers/s3Upload");
const { isOwner } = require("../helpers/guards");

const router = require("express").Router();

router.post("/create", s3UploadImg(), async (req, res) => {
  try {
    req.body.imageUrls = req.files.map((img) => img.location);

    const data = homeInputParser(req);

    data.owner = req.user._id;
    data.date = new Date().getTime();
    const createdData = await create(data);

    res.status(201).send({
      success: true,
      message: "Successfully uploaded " + req.files.length + " files!",
      createdData,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err.message,
      message: "Ad cannot be created!",
    });
  }
});

router.get("/catalog/:path/:limit", async (req, res) => {
  try {
    let data = "";
    const limit = req.params.limit;
    if (req.params.path == "properties") {
      data = await getAll(Number(limit) * 10);
    } else if (req.params.path == "new-projects") {
      data = await getNewProjects((limit) * 10);
    } else if (req.params.path == "retail-outlet") {
      data = await getRetailOutlet((limit)* 10);
    }

    res.status(200).send({
      message: "success",
      data,
      total_pages: data.total_pages,
      total_results: data.total_results,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err: err.message,
      message: "Cannot get items",
      function: "GET -> catalog",
    });
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getById(id);
    res.status(200).send({ success: true, message: "success", data });
  } catch (err) {
    res.status(400).json({
      success: false,
      err: err.message,
      message: `Cannot get item with id ${id}!`,
      function: "GET -> details/:id",
    });
  }
});

router.delete("/delete/:id", isOwner(), async (req, res) => {
  try {
    await deleteById(req.params.id);
    res.status(200).send({ success: true, message: "success" });
  } catch (err) {
    res.status(400).json({
      success: false,
      err: err.message,
      message: "Category not found!",
    });
  }
});

router.get("/edit/:id", isOwner(), async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getById(id);
    res.status(200).send({ success: true, data, message: "success" });
  } catch (err) {
    res.status(400).json({
      success: false,
      err: err.message,
      message: "Cannot get edit!",
    });
  }
});

router.put("/edit/:id", s3UploadImg(), async (req, res) => {
  try {
    if (req.body.deleteUrl) {
      s3Delete(req.body.deleteUrl);
    }

    if (req.files) {
      req.body.imageUrls = req.files.map((img) => img.location);
    }

    const updateData = homeInputParser(req);
    const id = req.params.id;
    const userId = req.user._id;
    const data = await updateById(id, userId, updateData);
    res.status(200).send({ success: true, data, message: "success" });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, err: err.message, message: "Cannot edit!" });
  }
});

//TODO implement it correktly
router.get(
  "/like/:id",
  /*isOwner() */ async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.id;
    } catch (err) {
      console.log(err);
    }
  }
);

//TODO implement it correktly
router.get("/sort-likes", async (req, res) => {
  try {
    const home = await sortByLikes();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
