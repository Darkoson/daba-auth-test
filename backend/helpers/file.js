const UPLOAD_DIR = "uploads/";
const multer = require("multer");
const path = require("path");

const User = require("../models/user");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/" + UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

exports.requestFileHandler = async  (req, res) => {
  let result ={}
  
  try {

    if (!req.isAuth) {
      throw new Error("The usernot authenticated !");
    }


    //geting the current user by ID
    const currentUser = await User.findById(req.userId);

    // making sure that the user exist: (This just an extra verification)
    if (!currentUser) {
      throw new Error("The user does not exist !");
    }

    
    currentUser.photo = req.file ? req.file.filename : "";
    const updatedUser = await currentUser.save();
    console.log('updatedUser:' , updatedUser);

    // returning the updated current user
    res.json({ photo: UPLOAD_DIR + updatedUser.photo })
  } catch (error) {
    res.json(error)
  }
};
