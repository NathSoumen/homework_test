var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.redirect("/users/add")
});
router.get('/login', function(req, res, next) {  
  res.render("Login")
});


router.get('/logout', function(req, res, next) { 
  console.log(req.session) 
  req.logOut()
  req.session.destroy()
  res.redirect('/login')
});



module.exports = router;
