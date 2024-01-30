const router = require("express").Router();
const userManager = require("../managers/userManager");

router.post("/login", async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        const token = await userManager.login(email, password);

        res.cookie("token", token);
        res.status(201).json({ status: "Loged In Successfully" });
    } catch (err) {
        res.status(500).json({ error: "Login Error" });
    }
});

router.post("/register", async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;

    try {
        const token = await userManager.register({
            username,
            email,
            password,
        });

        res.cookie("token", token);
        res.status(201).json({ status: "Registered Successfully" });
    } catch (err) {
        res.status(500).json({ error: "Register Error" });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(201).json({ status: "Loged Out Successfully" });
});

router.get("/profile/:userId", async (req, res) => {
    const userId = req.params.userId;
    const userData = await userManager.getUserById(userId).lean();
    res.json(userData);
});

module.exports = router;
