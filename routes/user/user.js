const express = require('express');
const session = require('express-session');
const router = express.Router();
const mongoose = require("mongoose");
const Register = require('../../model/user')

//for cache control
router.use((req, res, next) => {
    res.set('cache-control', 'no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0')
    next();
  });
  
//for session
router.post('/',async (req,res)=>{
    const user = await Register.find({Email: email , password: password});
    if(user.length > 0) {
        res.redirect('/home');
    } else {
        res.render('signin' , {isRegitered: true , errMessage: "User doesn't exist"});
    }  
})


// checking existing e-mail

router.post('/signin',  async (req, res) => {
        const user = await Register.findOne({Email:req.body.email , password: req.body.password})
       
         if(user){
           let session=req.session;
            session.userid=req.body.email;
            console.log(req.session)
             res.render('home')
        }else{
             res.render('signin',{message2:'User does not exist!'})
            
        }
})

//for session destroy
router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});


router.get('/signup', (req, res) => {
    res.render('signup')
})


router.get('/home', (req, res) => {
    res.render('home')
})


// checking user in signup

router.post('/save', async (req, res) => {

    //for finding same mail exist or not

    const check = req.body.email
    const user = await Register.findOne({ Email: check })
    if (user) {
         res.render('signup', { isRegitered: true, errMessage: 'E-mail id already exists !' });
        console.log('Exist')
    } else {
      res.render('signin')
        console.log('New')
    }
//for saving userinfo in db 

    if(req.body.password == req.body.password1) {
        const registeruser = new Register
            ({
                Email: req.body.email,
                password: req.body.password
            })

        const registered = await registeruser.save()
        res.render('signin')
    } else {
        res.render('signup', { message: 'invalid registration' })
    }


})

 
  





module.exports = router;
