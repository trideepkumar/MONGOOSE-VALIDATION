const express = require('express');
const user = require('../../model/user');
const router = express.Router();
const User =require('../../model/user');
const Register = require('../../model/user')

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

//for adding user
router.get('/adduser',(req,res) =>{
   res.render('adduser')
})

router.post('/adduser',async (req,res)=>{
    console.log(1)
    const check = req.body.email
    const user = await Register.find({ Email: check })
    if (user.length > 0) {
         res.render('adduser', { isRegitered: true, errMessage: 'E-mail id already exists !' });
        console.log('Exist')
    } else {
        if(req.body.password == req.body.password1) {
            const registeruser = new Register
                ({
                    Email: req.body.email,
                    password: req.body.password
                })
    
            const registered = await registeruser.save()
            res.render('admin')
        } else {
            res.render('adduser', { message3: 'invalid registration' })
        }
        res.redirect('/admin')
        console.log('New')
    }
})


router.post('/search', async (req,res)=>{
    console.log(req.body)
    const {search} = req.body ;
    const queryObject = {};
     if(search) {
         queryObject.Email = {$regex: search , $options: 'i'};
     }
     console.log(`${queryObject}`)
     const user = await User.find(queryObject)
     res.render('admin' , {users: user});
})

module.exports = router;