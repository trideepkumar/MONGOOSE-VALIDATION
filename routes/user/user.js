const { error } = require('console');
const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Register = require('../../model/user')

router.get('/', (req, res) => {
    res.render('signin');
});


router.get('/signup', (req, res) => {
    res.render('signup')
})


router.get('/home', (req, res) => {
    res.render('home')
})

// checking user in signin
router.post('/save', async (req, res) => {
    const check = req.body.email
    const user = await Register.findOne({ Email: check })
    if (user) {
         res.render('signup', { isRegitered: true, errMessage: 'E-mail id already exists !' });
        console.log('Exist')
    } else {
        res.render('home')
        console.log('New')
    }

    if(req.body.password == req.body.password1) {
        const registeruser = new Register
            ({
                Email: req.body.email,
                password: req.body.password
            })

        const registered = await registeruser.save()
        res.render('home')
    } else {
        res.render('signup', { message: 'invalid registration' })
    }


})

router.post('/signin',  async (req, res) => {
        const user = await Register.findOne({Email:req.body.email , password: req.body.password})
        console.log(user);
         if(user){
             res.render('home')
        }else{
             res.render('signin',{message2:'User does not exist!'})
            console.log(error)
        }
})
  

// checking existing e-mail



module.exports = router;
