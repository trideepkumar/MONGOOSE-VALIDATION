const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")

router.get('/', (req, res) => {
    res.render('signin');
});


router.get('/signup', (req, res) => {
    res.render('signup')
})


router.get('/home',(req,res)=>{
    res.render('home')
})


module.exports = router;
