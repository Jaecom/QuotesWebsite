const express = require("express");
const router = express.Router();
const Quote = require("../models/quote");
const fs = require('fs');
const path = require("path");

router.get("/quotes", async (req, res) => {
    const { page } = req.query;
    const quoteCount = parseInt(req.query.quoteCount);

    const quotes = await Quote.find({})
        .skip(quoteCount * (page - 1)).limit(quoteCount);
        
    const data = buildDataObject(quotes, quoteCount);

    res.json(data);
});

router.get("/templates/quote", (req, res) => {
    const html = fs.readFileSync(path.join(__dirname, '../views/templates/quote.ejs'));
    res.json({ html: html.toString()});
});

const buildDataObject = (quotes, quoteCount) => {
    const newObject = {};

    newObject.quotes = quotes;

    //creating flag for last Page
    if (quotes.length !== quoteCount) {
        newObject.lastPage = true;
    }
    return newObject;
}

module.exports = router;