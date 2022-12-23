const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    Email: String,
    password: String,
})

module.exports = mongoose.model('userinfo', userSchema)
