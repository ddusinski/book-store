module.exports = app => {
    const books = require("../controllers/book.controller.js");
    const basketOwners = require("../controllers/basketOwner.controller.js");
    const basketItems = require("../controllers/basketItem.controller.js");
    const router = require("express").Router();
    router.post("/books/", books.create);
    router.get("/books/findAll", books.findAll);
    router.delete("/books/:id", books.delete);

    router.post("/basketOwners/", basketOwners.create);
    router.get("/basketOwners/findAll", basketOwners.findAll);
    router.delete("/basketOwners/:id", basketOwners.delete);

    router.post("/basketItems/", basketItems.create);
    router.get("/basketItems/findAll", basketItems.findAll);
    router.delete("/basketItems/:id", basketItems.delete);

    app.use("/api/", router);
}