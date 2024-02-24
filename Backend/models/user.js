const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role:{
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
})


module.exports = mongoose.model("User",UserSchema);