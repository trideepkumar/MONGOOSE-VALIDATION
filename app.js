const express = require('express');
const app = express();
const path = require('path');
const Handlebars = require('handlebars')
const hbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
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
    handlebars: allowInsecurePrototypeAccess(Handlebars)
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

app.use('/admin',adminRoute);

app.get('/admin',(req,res)=>{
  res.render('admin')
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


