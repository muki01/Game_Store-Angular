const router = require("express").Router();
const userManager = require("../managers/userManager");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await userManager.login(email, password);

        res.cookie("token", token); //{ httpOnly: true, secure: true }
        res.status(200).json({ status: "Logged In Successfully" });
    } catch (err) {
        res.status(500).json({ error: "Login Error", details: err.message });
    }
});

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const token = await userManager.register({ username, email, password });

        res.cookie("token", token); //{ httpOnly: true, secure: true }
        res.status(201).json({ status: "Registered Successfully" });
    } catch (err) {
        res.status(500).json({ error: "Register Error", details: err.message });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ status: "Loged Out Successfully" });
});

router.get("/profile/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const userData = await userManager.getUserById(userId).lean();
        res.json(userData);
    } catch (err) {
        res.status(500).json({ error: "Profile Error", details: err.message });
    }
});

module.exports = router;
