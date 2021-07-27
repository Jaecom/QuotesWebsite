const express = require("express");
const router = express.Router();
const Quote = require("../models/quote");
const QUOTES_PER_PAGE = 10;
const fs = require('fs');
const path = require("path");

router.get("/quotes", async (req, res) => {
    const { page } = req.query;

    const quotes = await Quote.find({})
        .skip(QUOTES_PER_PAGE * (page - 1)).limit(QUOTES_PER_PAGE);
        
    const data = buildDataObject(quotes);

    res.json(data);
});

router.get("/templates/quote", (req, res) => {
    const html = fs.readFileSync(path.join(__dirname, '../views/templates/quote.ejs'));
    res.json({ html: html.toString() });
});

const buildDataObject = (quotes) => {
    const newObject = {};

    newObject.quotes = quotes;

    //creating flag for last Page
    if (quotes.length < QUOTES_PER_PAGE) {
        newObject.lastPage = true;
    }
    return newObject;
}

module.exports = router;