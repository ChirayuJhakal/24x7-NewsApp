const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('User', userSchema)
