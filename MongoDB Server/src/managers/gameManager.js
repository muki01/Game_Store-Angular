const Game = require("../models/Game");

exports.getAll = () => Game.find().populate("creatorId").sort({ _id: -1 });
exports.getAllByCategory = (gameCategory) =>
    Game.find({ category: gameCategory }).populate("creatorId").sort({ _id: -1 });
exports.getAllPopularGames = () => Game.find().populate("creatorId").limit(3);
exports.getOne = (gameId) => Game.findById(gameId).populate("creatorId");
exports.delete = (gameId) => Game.findByIdAndDelete(gameId);
exports.edit = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData);
exports.addComment = async (gameId, commentData) => {
    const game = await Game.findById(gameId);

    game.comments.push(commentData);
    return game.save();
};

// exports.getByOwner = (userId) => Game.find({ owner: userId });

exports.create = (gameData) => Game.create(gameData);
