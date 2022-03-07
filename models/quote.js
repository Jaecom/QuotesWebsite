const mongoose = require("mongoose");
const { Schema } = mongoose;

const schemaOptions = {
	toJSON: {
		virtuals: true,
	},
};

const quoteSchema = new Schema(
	{
		text: {
			raw: String,
			full: String,
			short: String,
			keywords: String,
			noKeywords: String,
			preview: String,
		},
		author: {
			name: String
		},
		title: {
			type: String,
			required: true,
		},
		genre: {
			type: [String],
			require: true,
			default: [],
		},
		createdDate: {
			type: Date,
			default: Date.now(),
		},
		image: {
			original: String,
			medium: String,
			thumbnail: String,
		},
		likes: {
			users: {
				type: [String],
				required: true,
				default: [],
			},
			total: {
				type: Number,
				required: true,
				default: 0,
			},
		},
		owner: String,
		views: {
			type: Number,
			default: 0,
		},
	},
	schemaOptions
);

module.exports = mongoose.model("Quote", quoteSchema);
