const Game = require("../models/Game");

exports.getAllGames = () => Game.find().populate("creatorId").sort({ _id: -1 });
exports.getGamesByCategory = (gameCategory) =>
    Game.find({ category: gameCategory }).populate("creatorId").sort({ _id: -1 });
exports.getPopularGames = () => Game.find().populate("creatorId").limit(3);
exports.getGameById = (gameId) => Game.findById(gameId).populate("creatorId");
exports.deleteGame = (gameId) => Game.findByIdAndDelete(gameId);
exports.editGame = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData);
// exports.addComment = async (gameId, commentData) => {
//     const game = await Game.findById(gameId);

//     game.comments.push(commentData);
//     return game.save();
// };

// exports.getByOwner = (userId) => Game.find({ owner: userId });

exports.createGame = (gameData) => Game.create(gameData);
