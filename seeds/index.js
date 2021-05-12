const quotes = require("./quoteData.js");
const Quote = require("../models/quote.js");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/quoteWebsite",
    { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
    console.log("Database connected");
});

db.on("error", console.error.bind(console, "connection error:"));


const clearAndInputSeedData = async () => {
    await Quote.deleteMany({});

    for(quote of quotes) {
        const result = new Quote({ ...quote });
        await result.save();
    };

}

clearAndInputSeedData().then(() => {
    db.close();
});