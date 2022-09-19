const {
  register,
  login,
  editUser,
  getById,
  getUserByEmail,
  editUserResetToken,
} = require("../services/user");
const jwt = require("jsonwebtoken");
const { s3UploadImg } = require("../helpers/s3Upload");
const { s3Delete } = require("../helpers/s3Delete");
const { createTransport } = require("nodemailer");
require("dotenv/config");

const router = require("express").Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, repass } = req.body;
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
  try {
    const { email, password } = req.body;
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
    const id = req.user._id;

    const user = await getById(id);
    const userData = removePassword(user);
    res.status(200).send({ success: true, userData });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

router.put("/editUser", s3UploadImg(), async (req, res) => {
  try {
    const { username, email } = req.body;

    if (req.files.length > 0) {
      req.body.imageUrl = req.files[0].location;
    } else if (req.body.img && req.files.length <= 0) {
      req.body.imageUrl = req.body.img;
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
    const userData = removePassword(user);
    res.status(201).send({ success: true, userData, token, expiresIn: 3600 });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/reset-password", async (req, res) => {
  const email = req.body.email;
  const user = await getUserByEmail(email)
  if (!user) {
    return res.status(422).json({ error: 'User doesn\'t exist with that email' })
  }

  const resetToken = createToken(user);
  user.resetExpireToken = Date.now() + 3600000; // 1h;
  user.resetToken
  editUserResetToken(user)
  sendEmailResetPassword(email, resetToken);
});

 function sendEmailResetPassword(email,token) {
  
  const mail = createTransport( {
    service: "gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: "Admin",
    to: 'turgay993@abv.bg', // todo change it
    subject: "Reset Password Link - real-estate",
    html: // todo change url => localhost to real-estate
      '<p>You requested for reset password, kindly use this <a href="http://localhost:4200/auth/reset-password?token=' +
      token +
      '">link</a> to reset your password</p>',
  };

   mail.sendMail (mailOptions,  (error, info) => {
    if (error) {
      console.log(error);
      console.log(info);
    } else {
      console.log(0);
    }
  });
}

router.post("/update-password", async (req, res) => {
  try {
    const { password, repass,token } = req.body;
    // if expire data is < current date then error
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
})
const removePassword = (data) => {
  const { email, id, isAdmin, isBroker, isNew, likedAd, username, imageUrl } =
    data;

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
