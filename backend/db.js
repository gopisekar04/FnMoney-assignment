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


const assessmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    githublink: {
        type: String,
        required: true,
        trim: true,
    },
    publishlink: {
        type: String,        
        trim: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    publishedAt: {
        type: Date,
        default: Date.now
    }
})

const Users = mongoose.model('Users', UserSchema);
const Assessments = mongoose.model('Assessments', assessmentSchema);

module.exports = {
    Users,
    Assessments
}