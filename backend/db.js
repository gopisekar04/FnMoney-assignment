const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://admin04:hlyShlsR4FWCbHe7@cluster0.00msngw.mongodb.net/FnMoney")

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,        
    },
    lastName: {
        type: String,
        trim: true,        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    }

})


const Users = mongoose.model('Users', UserSchema);

module.exports = {
    Users
}