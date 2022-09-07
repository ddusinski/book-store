module.exports = app => {
    const books = require("../controllers/book.controller.js");
    const router = require("express").Router();
    router.post("/", books.create);
    router.get("/findAll", books.findAll);
    router.delete("/:id", books.delete);
    app.use("/api/books", router);
}