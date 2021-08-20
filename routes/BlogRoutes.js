var express = require('express');
var router = express.Router();
const Blog = require('../models/Blog')
/* GET home page. */

let loggedIn = function(req,res,next) {
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()) {
        
        next()
    }else {
        res.redirect('/login')
    }

}

router.get('/', async function (req, res, next) {
    await Blog.find({}).then((doc) => {
        res.json(doc)
    }).catch(err => {
        console.log(err);
    })
});

router.get('/top',loggedIn, function (req, res, next) {
   res.send({
       message:"This is top page",
       session:req.session
   })
});


router.get("/add", (req, res) => {
    res.render("Insert")
})
router.get("/:id", async (req, res) => {
    let id = req.params.id
    await Blog.findById(id).then(doc => {
        res.json(doc)
    }).catch(err => {
        console.log(err)
    })

})

// POST ROUTES

router.post("/add", (req, res) => {
    let newBlog = new Blog()
    newBlog.title = req.body.title
    newBlog.description = req.body.description
    newBlog.save().then((doc) => {
        res.json(doc)
    }).catch(err => {
        console.log(err)
    })

})

//PUT
router.put("/:id", async(req, res) => {
    let title = req.body.title
    let desc = req.body.description
    await Blog.findById(req.params.id).then(doc => {        
        doc.title = title
        doc.description = desc
        doc.save().then((doc2) => {
            res.json(doc2)
        }).catch(err => {
            console.log(err)
        })
    })

})

//Delete

router.delete('/:id/delete', (req, res) => {
    Blog.findByIdAndDelete(req.params.id).then(() => {
        res.json("File is deleted")
    }).catch(err => {
        console.log(err)
    })
})




module.exports = router;
