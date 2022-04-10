const { register, login, editUser,getById } = require("../services/user");
const jwt = require("jsonwebtoken");
const { s3UploadImg } = require("../helpers/s3Upload");
const { s3Delete } = require("../helpers/s3Delete");
require("dotenv/config");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  const { username, email, password, repass } = req.body;

  try {
    checkInput(req.body);

    if (password.length < 4)
      res.status(400).send("Password cannot be less then 4 characters");
    if (password.trim() != repass.trim())
      res.status(400).send("Password don't match");

    const user = await register(username.trim(), email.trim(), password.trim());

    token = createToken(user);
    const userData = removePassword(user);
    res.status(201).send({ userData, token, expiresIn: 3600 });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    checkInput({ email: email, password: password });
    const user = await login(email.trim(), password.trim());
    const token = createToken(user);

    const userData = removePassword(user);

    res.status(201).json({ userData, token, expiresIn: 3600 });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

function createToken(user) {
  const userViewModel = { _id: user._id, email: user.email };
  const token = jwt.sign(userViewModel, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
}

function checkInput(inputObj) {
  if (
    Object.values(inputObj).some(
      (field) => field == undefined || field == ""
    ) == true
  ) {
    res.status(400).json("All fields required");
  }
}
router.get("/editUser", async (req, res) => {
  try {
    const id = req.user._id
    const user = await getById(id)
    const userData = removePassword(user)
    res.status(200).send({ success: true, userData });
  } catch (err) {
    res.status(401).send({message: err.message})
  }
})

router.put("/editUser", s3UploadImg(), async (req, res) => {
  try {
    const { username, email } = req.body;

    if (req.files.length > 0) {
      req.body.imageUrl = req.files[0].location;
    } else if (req.body.img && req.files.length <= 0) {
      req.body.imageUrl = req.body.img
    }
    if (req.body.deleteUrl !== undefined && req.body.deleteUrl) {
      s3Delete(req.body.deleteUrl);
    }
    const user = await editUser(
      req.user._id,
      username,
      email,
      req.body.imageUrl
    );
    token = createToken(user);
    const userData = removePassword(user)
    res.status(201).send({success:true ,userData, token, expiresIn: 3600 });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const removePassword = (data) => {
  const { email, id, isAdmin, isBroker, isNew, likedAd, username,imageUrl } = data;
  const userData = {
    email,
    id,
    isAdmin,
    isBroker,
    isNew,
    likedAd,
    username,
    imageUrl,
  };
  return userData;
};

module.exports = router;
