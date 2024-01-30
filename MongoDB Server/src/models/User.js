const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        minLength: [2, "Username should be at least 2 characters"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        minLength: [10, "Email should be at least 2 characters"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [4, "Password should be at least 2 characters"],
    },
    role: {
        type: String,
        default: "user",
    },
    balance: {
        type: Number,
        default: 200,
    },
    image: {
        type: String,
        default: "https://img.freepik.com/free-icon/user_318-159711.jpg",
    },
    title: {
        type: String,
        default: "",
    },
    purchasedGames: {
        type: Array,
        default: [],
    },
    likedGames: {
        type: Array,
        default: [],
    },
});

userSchema.pre("save", async function () {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
