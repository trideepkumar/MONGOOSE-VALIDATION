const express = require('express');
const user = require('../../model/user');
const router = express.Router();
const User =require('../../model/user')

//for admin login
const myemail = "trideep@gmail.com"
const mypassword ="trideep123"

router.get('/admin-log', (req, res) => {
   res.render('admin-log')
});

router.post('/admin-log', (req, res) => {
    console.log(req.body)
    if(req.body.email === myemail && req.body.password === mypassword){
        res.redirect('/admin')
    }else
    res.render('admin-log',{info:'admin not found!'});
});
//user information stored in admin home 

router.get('/', async (req, res) => {
    const user = await User.find();
    console.log(user);
    res.render('admin',{users:user});

});

//user id getting in update page

router.get('/update/:id',async (req,res) =>{
    console.log(req.params)
    const {id} = req.params ;
    const user = await User.find({_id:id})
    console.log(user)
    res.render('update',{user:user[0]})
})

router.post('/update/:id',async (req,res) =>{
    console.log(req.params)
    console.log(req.body)
    const {id} = req.params ;
    const user = await User.findOneAndUpdate({_id:id},{$set:{Email:req.body.email,password:req.body.password}})
   res.redirect('/admin')
})
//for deleting

router.get('/delete/:id',async (req,res) =>{
    const {id} = req.params ;
    const user = await User.findOneAndDelete({_id:id})
   res.redirect('/admin')
})


module.exports = router;