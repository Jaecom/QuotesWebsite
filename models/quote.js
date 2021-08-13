const mongoose = require("mongoose");
const { Schema } = mongoose;

const schemaOptions = {
    toJSON: {
        virtuals: true
    }
};

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
    image: {
        type: String,
        require: true
    }
}, schemaOptions)

quoteSchema.virtual("imageThumb").get(function() {
    return this.image.replace(/&w=\d{1,}/, "&h=100");
})

quoteSchema.virtual("imageMedium").get(function() {
    return this.image.replace(/&w=\d{1,}/, "&h=500");
})

quoteSchema.virtual("imageBig").get(function() {
    return this.image.replace(/&w=\d{1,}/, "&w=1500");
})

quoteSchema.virtual("keywords").get(function() {
    return extractKeywords(this.quoteShort);
});

quoteSchema.virtual("quoteExcludeKeywords").get(function () {
    return extractRest(this.quoteShort);
});

function extractKeywords(string) {
    const keywords = string.split(" ").slice(0,3).join(" ");
    return keywords;
}

function extractRest(string) {
    const quote = string.split(" ").slice(3).join(" ");
    return quote;
}

module.exports = mongoose.model("Quote", quoteSchema);