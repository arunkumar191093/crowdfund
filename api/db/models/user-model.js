const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['innovator', 'donor'], required: true }
});

module.exports = mongoose.model('User', userSchema);
