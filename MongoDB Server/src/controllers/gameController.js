const router = require("express").Router();
// const { isAuth } = require("../middlewares/authMiddleware");

const gameManager = require("../managers/gameManager");
// const { getErrorMessage } = require("../utils/errorHelpers");

router.get("/", async (req, res) => {
    const games = await gameManager.getAll().lean();
    res.json(games);
});

router.get("/action", async (req, res) => {
    const games = await gameManager.getAllByCategory("action").lean();
    res.json(games);
});

router.get("/adventure", async (req, res) => {
    const games = await gameManager.getAllByCategory("adventure").lean();
    res.json(games);
});

router.get("/simulation", async (req, res) => {
    const games = await gameManager.getAllByCategory("simulation").lean();
    res.json(games);
});

router.get("/survival", async (req, res) => {
    const games = await gameManager.getAllByCategory("survival").lean();
    res.json(games);
});

router.get("/sports", async (req, res) => {
    const games = await gameManager.getAllByCategory("sports").lean();
    res.json(games);
});

router.get("/racing", async (req, res) => {
    const games = await gameManager.getAllByCategory("racing").lean();
    res.json(games);
});

router.get("/horror", async (req, res) => {
    const games = await gameManager.getAllByCategory("horror").lean();
    res.json(games);
});

router.get("/popular", async (req, res) => {
    const popularGames = await gameManager.getAllPopularGames().lean();
    res.json(popularGames);
});

router.post("/create", async (req, res) => {
    const gameData = { ...req.body };
    console.log(gameData);

    try {
        await gameManager.create(gameData);
        res.json({ status: "Game created successfully" });
    } catch (err) {
        res.status(500).json({ error: "Game create error" });
    }
});

router.get("/:gameId/details", async (req, res) => {
    const gameId = req.params.gameId;
    const game = await gameManager.getOne(gameId).lean();
    res.json(game);
});

router.get("/:gameId/delete", async (req, res) => {
    const gameId = req.params.gameId;
    try {
        await gameManager.delete(gameId);
        res.json({ status: "Game deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Game delete error" });
    }
});

router.get("/:gameId/edit", async (req, res) => {
    const game = await gameManager.getOne(req.params.gameId).lean();
    res.json({ game });
});

router.post("/:gameId/edit", async (req, res) => {
    const gameId = req.params.gameId;
    const gameData = req.body;

    try {
        await gameManager.edit(gameId, gameData);
        // res.redirect(`/games/${gameId}/details`);
    } catch (err) {
        res.json({ status: "Game deleted successfully" });
        // res.render("games/edit", {
        //     error: "Unable to update game",
        //     ...gameData,
        // });
    }
});

router.post("/:gameId/comments", async (req, res) => {
    const gameId = req.params.gameId;
    const { message } = req.body;
    const user = req.user._id;

    await gameManager.addComment(gameId, { user, message });
    // res.redirect(`/games/${gameId}/details`);
});

module.exports = router;
