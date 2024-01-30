const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { auth } = require("./middlewares/authMiddleware");
const cors = require("cors");

const app = express();
const port = 5000;

mongoose
    .connect(`mongodb://127.0.0.1:27017/gamingWebsite`)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log(`DB Error, `, err.message));

app.use(
    cors({
        origin: "http://localhost:4200",
        credentials: true,
    })
);
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(auth);
app.use(routes);

app.listen(port, console.log(`Server is listening on port ${port}`));
