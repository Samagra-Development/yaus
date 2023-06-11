require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dataRouters = require("./routes/data.route");
const PORT = process.env.PORT || 3233;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", dataRouters);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
