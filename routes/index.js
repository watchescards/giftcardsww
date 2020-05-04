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
const { resizeaadharPhoto,uploadPostPhotos } = require('../controllers/card');
  const Admin = require('../models/admin');
    const Card = require('../models/cards');
const User = require('../models/user');

/* GET home page. */
router.get('/',async function(req, res, next) {
  const cards = await Card.find({});
  res.render('index', { cards: cards });
});

router.get('/card/:name',async function(req, res, next) {
  const cardss = await Card.findOne({card_name:req.params.name});
    const cards = await Card.find({});
  res.render('card_specific', { cardss: cardss,cards: cards });
});

router.get('/add_card',async function(req, res, next) {
   const cards = await Card.find({});
  res.render('add_card', { cards: cards });
});

router.post('/add_card',uploadPostPhotos,resizeaadharPhoto,async function(req,res,next){
  console.log(req.body);
  const card = await Card.create(req.body);
  console.log(card);
  return res.redirect('/');
});

router.get('/about',async function(req, res, next) {
    const cards = await Card.find({});
  res.render('about', { cards: cards });
});
router.get('/login',async function(req, res, next) {
    const cards = await Card.find({});
  res.render('login', { cards: cards });
});

router.get('/contact',async function(req, res, next) {
    const cards = await Card.find({});
  res.render('contact', { cards: cards });

});

router.get('/dashboard',middleware.isLoggedIn, function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
});
router.get('/dashboard/messages', function(req, res, next) {
  res.render('contact_messages', { title: 'Express' });
});








router.post("/user_login", (req, res, next) => {
  passport.authenticate("admin", (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      
      return res.redirect('/login');
    }

      req.logIn(user, err => {
        if (err) { return next(err); }

        let redirectTo = req.session.redirectTo ? req.session.redirectTo : '/dashboard';
        delete req.session.redirectTo;
        res.redirect(redirectTo);


      });

 })(req, res, next);
});


router.post("/signup", function (req, res, next) {
const newUser = {
    username:req.body.username,
    email:req.body.email
};
  Admin.register(newUser, req.body.password, function(err, user){
    if(err){
        console.log(err);
        return res.redirect("/signup"); 
    }
    res.redirect("/login"); 
  });

});

router.get('/dashboard/add', function(req,res){
  return res.render('admin_add');
})

// router.post('/add',multipartMiddleware, function(req,res){
//    cloudinary.v2.uploader.upload(req.files.card_image.path,function (err, result) {
//     req.body.card_image = result.url;
//   Card.create(req.body);
//   return res.redirect('/dashboard/add');
// });
// });

module.exports = router;
