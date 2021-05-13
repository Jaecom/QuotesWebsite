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

    for (quote of quotes) {
        const quoteRaw = quote.quote;
        const quoteFull = getFullQuote(quoteRaw);
        const quoteShort = getShortQuote(quoteRaw);

        const result = new Quote({
            quoteFull,
            quoteShort,
            title: quote.title,
            author: quote.author,
            genre: quote.genre
        });
        await result.save();
        console.log(result.quoteFull, result.quoteShort)
    };

}

const getFullQuote = (quote) => {
    const regex = /<|>/g;
    const fullQuoteCleanUp = quote.replace(regex, "");
    return fullQuoteCleanUp;
}

const getShortQuote = (quote) => {
    const startMarkerIndex = quote.indexOf("<") + 1;
    const endMarkerIndex = quote.indexOf(">");
    const shortQuote = quote.slice(startMarkerIndex, endMarkerIndex);

    return shortQuote;
}

clearAndInputSeedData().then(() => {
    db.close();
});
