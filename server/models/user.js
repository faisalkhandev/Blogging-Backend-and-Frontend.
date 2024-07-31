const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    age: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
})

module.exports = mongoose.model("User", userSchema)