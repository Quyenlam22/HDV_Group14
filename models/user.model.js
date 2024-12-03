const mongoose = require("mongoose")
const generate = require("../helpers/admin/generate")

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: String,
    tokenUser: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema, "users")

module.exports = User