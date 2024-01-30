const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [2, "Name should be at least 2 characters"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
    image: {
        type: String,
        required: [true, "ImageURL is required"],
        match: [/^https?:\/\//, "Invalid URL"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: [5, "Description min length 5 charracter"],
        maxLength: [1500, "Description min length 400 charracter"],
    },
    downloadURL: {
        type: String,
        required: [true, "Download URL is required"],
        match: [/^https?:\/\//, "Invalid URL"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0,
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
