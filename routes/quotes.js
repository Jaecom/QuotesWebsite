const express = require("express");
const router = express.Router();
const Quote = require("../models/quote");
const QUOTES_PER_PAGE = 10;

router.get('/favicon.ico', (req, res) => res.status(204));

router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const dataSize = await Quote.countDocuments({});
    let noFurtherRequest = false;

    if ((page - 1) * QUOTES_PER_PAGE > dataSize) {
        const maxPageNumber = Math.ceil(dataSize / QUOTES_PER_PAGE);
        res.redirect(`/?page=${maxPageNumber}`);
    }

    if (page * QUOTES_PER_PAGE > dataSize) {
        noFurtherRequest = true;
    }

    const pagination = { page, noFurtherRequest }

    //because aggregate is different from Model.find(), need to hydrate model
    const quoteOfDay = await Quote.aggregate([{ $sample: { size: 1 } }])
        .then(docs => docs.map(doc => Quote.hydrate(doc)));

    const quotes = await Quote.find({}).limit(QUOTES_PER_PAGE * pagination.page).sort({ _id: -1 });
    res.render("quotes/index", { quotes, quoteOfDay, pagination });
});


router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const quote = await Quote.findById(id);

    res.render("quotes/show", { quote });
});


module.exports = router; 