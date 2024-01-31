const router = require("express").Router();
// const { isAuth } = require("../middlewares/authMiddleware");

const gameManager = require("../managers/gameManager");
// const { getErrorMessage } = require("../utils/errorHelpers");

router.get("/", async (req, res) => {
    try {
        const games = await gameManager.getAllGames().lean();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/action", async (req, res) => {
    try {
        const games = await gameManager.getGamesByCategory("action").lean();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/adventure", async (req, res) => {
    try {
        const games = await gameManager.getGamesByCategory("adventure").lean();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/simulation", async (req, res) => {
    try {
        const games = await gameManager.getGamesByCategory("simulation").lean();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/survival", async (req, res) => {
    try {
        const games = await gameManager.getGamesByCategory("survival").lean();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/sports", async (req, res) => {
    try {
        const games = await gameManager.getGamesByCategory("sports").lean();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/racing", async (req, res) => {
    try {
        const games = await gameManager.getGamesByCategory("racing").lean();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/horror", async (req, res) => {
    try {
        const games = await gameManager.getGamesByCategory("horror").lean();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/popular", async (req, res) => {
    try {
        const popularGames = await gameManager.getPopularGames().lean();
        res.status(200).json(popularGames);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/create", async (req, res) => {
    const gameData = { ...req.body };
    console.log(gameData);

    try {
        await gameManager.createGame(gameData);
        res.status(201).json({ status: "Game created successfully" });
    } catch (err) {
        res.status(500).json({ error: "Game create error" });
    }
});

router.get("/:gameId/details", async (req, res) => {
    const gameId = req.params.gameId;
    try {
        const game = await gameManager.getGameById(gameId).lean();
        if (game) {
            res.status(200).json(game);
        } else {
            res.status(404).json({ error: "Game not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:gameId/delete", async (req, res) => {
    const gameId = req.params.gameId;
    try {
        await gameManager.deleteGame(gameId);
        res.status(200).json({ status: "Game deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Game delete error" });
    }
});

router.get("/:gameId/edit", async (req, res) => {
    try {
        const game = await gameManager.getGameById(req.params.gameId).lean();
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/:gameId/edit", async (req, res) => {
    const gameId = req.params.gameId;
    const gameData = req.body;

    try {
        const updatedGame = await gameManager.editGame(gameId, gameData);
        if (updatedGame) {
            res.status(200).json({ status: "Game edited successfully" });
        } else {
            res.status(404).json({ error: "Game not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// router.post("/:gameId/comments", async (req, res) => {
//     const gameId = req.params.gameId;
//     const { message } = req.body;
//     const user = req.user._id;

//     await gameManager.addComment(gameId, { user, message });
//     // res.redirect(`/games/${gameId}/details`);
// });

module.exports = router;
