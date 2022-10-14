const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();
const port = 3000;
const { users, ROLE } = require("./access")
const { authUser, authRole } = require("./basicAuth")

let books = [
    { title: "test title1", author: "test author1" },
    { title: "test title2", author: "test author2" }
];

app.use(cors());

//configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(setUser);


//seq part
const db = require("./models/index");
db.sequelize.sync();
require("./routes/bookShop.routes.js")(app);
//


// app.get("/", function (req, res) {
//     res.send("hello world, from express!");
// });

// app.get("/books", authUser, authRole(ROLE.ADMIN), (req, res) => {
//     res.json(books);
// });

// app.get("/store", authUser, (req, res) => {
//     res.send("Store Page");
// })

function setUser(req, res, next) {
    const userId = req.body.userId;
    if (userId) {
        req.user = users.find(u => u.id === userId)
    }
    next();
}

app.listen(port, () => {
    console.log(`Started application on port ${port}`)
});
