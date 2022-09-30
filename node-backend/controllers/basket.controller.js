const db = require("../models");
const Basket = db.baskets;

//create new basket
exports.create = (req, res) => {
    const basket = {
        owner: req.body.owner,
        phone: req.body.phone
    };

    Basket.create(basket)
        .then(newBasket => {
            console.log("new basked was created");
            res.send(newBasket);
        })
        .catch(err => {
            res.status(500).send({ message: "Some errors occurred" });
        });
};

// find all baskets
exports.findAll = (req, res) => {
    Basket.findAll().then(data => {
        if (data) {
            res.send(data)
        } else {
            res.status(404).send({ message: "Cannot find basketItem" })
        }
    }).catch(err => {
        res.status(500).send({ message: "Error found: " + err.me })
    });
};