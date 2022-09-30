module.exports = app => {
    const books = require("../controllers/book.controller.js");
    const baskets = require("../controllers/basket.controller.js");
    const basketItems = require("../controllers/basketItem.controller.js");
    const router = require("express").Router();
    router.post("/books/", books.create);
    router.get("/books/findAll", books.findAll);
    router.delete("/books/:id", books.delete);

    router.post("/basket/", baskets.create);
    router.get("/basket/findAll", baskets.findAll);

    router.post("/basketItem/", basketItems.create);
    router.get("/basketItem/findAll", basketItems.findAll);

    app.use("/api/", router);
}