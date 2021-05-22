const express = require("express");
const app = express();
const path = require("path");
const Quote = require("./models/quote.js")
const ejsMate = require("ejs-mate");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/quoteWebsite", { useNewUrlParser: true, useUnifiedTopology: true });

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
    const quotes = await Quote.aggregate([{ $sample: { size: 5 } }])
        .then(docs => docs.map(doc => Quote.hydrate(doc)));

    const quoteOfDay = await Quote.aggregate([{ $sample: { size: 1 } }])
        .then(docs => docs.map(doc => Quote.hydrate(doc)));
    
    res.render("quotes/index", { quotes, quoteOfDay});
});

app.get("/api/quotes", async (req, res) => {
    const results = await Quote.find({});
    res.json(results);
});



app.get("/:id", async (req, res) => {
    res.send("hello");
});


const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

