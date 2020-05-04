var express = require('express');
var router = express.Router();
const middleware = require("../middleware");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport'),
  LocalStrategy = require("passport-local");
const fs = require('fs'),
cloudinary = require('cloudinary'),
multipart = require('connect-multiparty');
const multer = require('multer');
const multerStorage = multer.memoryStorage();

const nodemailer = require('nodemailer');
cloudinary.config({
    cloud_name: 'saikiran2211',
    api_key: '325518163817134',
    api_secret: 'EUrowRf2-p9cmCy4UMGb3NHhPPU'
});

const sharp = require('sharp');

  const Admin = require('../models/admin');
    const Card = require('../models/cards');
const User = require('../models/user');
const multipartMiddleware = multipart();

const multerFilter = function (req, file, cb){
  console.log("hi");
  console.log(file);
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else if (file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Not an image /video! Please upload only images/ videos.',
        400
        ),
      false
      );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadPostPhotos = upload.fields([

  { name: 'card_image', maxCount: 1 },
  ]);



exports.resizeaadharPhoto =[

async (req, res, next) => {

  console.log(req.files.card_image.path);
  if (!req.files.card_image) return next();
  const filename = `${req.body.card_name}-${Date.now()}.jpeg`;
  await sharp(req.files.card_image[0].buffer)
  .resize(500, 500)
  .toFormat('jpeg')
  .jpeg({ quality: 190 })
  .toFile(`public/images/${filename}`);
  req.body.card_image=filename;
  next();
}];
