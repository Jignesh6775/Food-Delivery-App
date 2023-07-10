const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        zip: { type: String }
    }
}, {
    timestamp: true,
    versionKey: false
})

const UserModel = mongoose.model("user", userSchema)

module.exports = { UserModel }