const mongoose = require("mongoose");
const { Schema } = mongoose;

const quoteSchema = new Schema({
    quoteFull: {
        type: String,
        required: true
    },
    quoteShort: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        require: true
    },
})

quoteSchema.virtual('partiallyBoldedQuote').get(function () {
    return this.quoteFull.replace(this.quoteShort, `<b>${this.quoteShort}</b>`);
});

module.exports = mongoose.model("Quote", quoteSchema);