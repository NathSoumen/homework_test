var express = require('express');
var router = express.Router();
const User = require('../models/User')
const passport = require('passport')
/* GET users listing. */
router.get('/', async function(req, res, next) {
  await User.find({}).then(doc => {
      res.json(doc)
  })
});
router.get('/add',(req,res) => {
  res.render("Registration")
})
router.get('/:id', async function(req, res, next) {
  await User.findById({}).then(doc => {
      res.json(doc)
  })
});


// POST Routes

router.post("/add",(req,res) => {
  console.log(req.session)
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password
    let newUser = new User()
    newUser.email = email
    newUser.username = username    
    newUser.password = newUser.genHash(password)
    newUser.save()
            .then((doc) => {
              res.json(doc)
            })
            .catch(err => {
              console.log(err)
            })

})

router.post('/login',passport.authenticate('local',{
  failureRedirect:'/login',
  successRedirect:'/blog/top'
}))




module.exports = router;
