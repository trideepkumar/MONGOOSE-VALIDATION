const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
//mongoose schema require
const Register = require('./model/user')
// midddlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));



// Importing routes




// hbs configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// root setup for hbs
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "layout",
    layoutDir: __dirname + "/views/layout/",
    partialsDir: __dirname + "/views/partials",
  })
);


// Importing routes

const userRoute = require('./routes/user/user');
const adminRoute = require('./routes/admin/admin');
const { stringify } = require('querystring');






// // route setup

app.use('/', userRoute);

app.get('/', (req, res) => {
  res.render('signin');
})

//data connection to mongodb

app.post('/save', async (req, res) => {
  if (req.body.password == req.body.password1) {
    const registeruser = new Register
    ({
      Email: req.body.email,
      password: req.body.password
    })
    const registered = await registeruser.save()
    res.render('home')
  } else 
  {
    res.render('signup', { message: 'invalid registration' })
  }


})



// mongoose setup
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => {

    app.listen(3000, () => {
      console.log('Server is up');
    })
  })
  .catch(err => {
    console.log(err);
    console.log('Server is down')
  })


