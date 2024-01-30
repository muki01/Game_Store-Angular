const jwt = require("../lib/jwt");

const { SECRET } = require("../config/config");

exports.auth = async (req, res, next) => {
    const token = req.cookies["token"];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;
        } catch (err) {
            res.clearCookie("token");
            res.locals.isAuthenticated = false;
        }
    } else {
        res.locals.isAuthenticated = false;
    }
    next();
};

// exports.isAuth = (req, res, next) => {
//     if (!req.user) {
//         return res.redirect("/user/login");
//     }
//     next();
// };
