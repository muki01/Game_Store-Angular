const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");

const { SECRET } = require("../config/config");

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        res.json({ status: "Invalid username or password" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        res.json({ status: "Invalid username or password" });
    }

    const token = await generateToken(user);
    return token;
};

exports.register = async (userData) => {
    const username = await User.findOne({ username: userData.username });
    const email = await User.findOne({ email: userData.email });
    if (username) {
        res.json({ status: "Username already exists" });
    }
    if (email) {
        res.json({ status: "Email already exists" });
    }
    const createdUser = await User.create(userData);
    const token = await generateToken(createdUser);
    return token;
};

exports.getUserById = (userId) => User.findById(userId);

async function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: "2d" });

    return token;
}
