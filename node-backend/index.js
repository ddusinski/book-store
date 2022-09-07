const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();
const port = 3000;

let books = [];

app.use(cors());

//configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//seq part
const db = require("./models/index");
db.sequelize.sync();
require("./routes/book.routes.js")(app);
//


app.get("/", function (req, res) {
    res.send("hello world, from express!");
});

app.get("/books", (req, res) => {
    res.json(books);
});

app.listen(port, () => {
    console.log(`Started application on port ${port}`)
});
