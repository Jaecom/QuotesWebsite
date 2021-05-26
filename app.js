const express = require("express");
const app = express();
const path = require("path");
const Quote = require("./models/quote.js")
const ejsMate = require("ejs-mate");
const fs = require('fs');

const QUOTES_PER_PAGE = 2;
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/quoteWebsite",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})


app.engine("ejs", ejsMate);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.static('public'));

app.get("/", async (req, res) => {
    //because aggregate is different from Model.find(), need to hydrate model
    const quoteOfDay = await Quote.aggregate([{ $sample: { size: 1 } }])
        .then(docs => docs.map(doc => Quote.hydrate(doc)));

    const quotes = await Quote.find({}).limit(QUOTES_PER_PAGE);

    res.render("quotes/index", { quotes, quoteOfDay });
});

app.get("/:id", async (req, res) => {
    res.send("seperate page");
});

app.get("/api/quotes", async (req, res) => {
    const { page } = req.query;

    const quotes = await Quote.find({})
        .skip(QUOTES_PER_PAGE * (page - 1)).limit(QUOTES_PER_PAGE);

    const data = buildDataObject(quotes);

    res.json(data);
});

app.get("/api/templates/quote", (req, res) => {
    const html = fs.readFileSync(__dirname + '/views/templates/quote.ejs');
    res.json({ html: html.toString()});
});



const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})


const buildDataObject = (quotes) => {
    const newObject = {};

    newObject.quotes = quotes;

    //creating flag for last Page
    if (quotes.length < QUOTES_PER_PAGE) {
        newObject.lastPage = true;
    }
    return newObject;
}