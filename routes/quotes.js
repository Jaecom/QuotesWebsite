const express = require("express");
const router = express.Router();
const Quote = require("../models/quote");
const QUOTES_PER_PAGE = 15;

router.get("/favicon.ico", (req, res) => res.status(204));

router.get("/", async (req, res) => {
	//because aggregate is different from Model.find(), need to hydrate model
	const quoteHeader = await Quote.aggregate([{ $sample: { size: 5 } }]).then(
		(docs) => docs.map((doc) => Quote.hydrate(doc))
	);

	const quoteCarasel = await Quote.aggregate([
		{ $match: { quoteShort: /^.{0,200}$/ } },
		{ $sample: { size: 3 } },
	]).then((docs) => docs.map((doc) => Quote.hydrate(doc)));

	const quotePick = await Quote.aggregate([{ $sample: { size: 18 } }]).then(
		(docs) => docs.map((doc) => Quote.hydrate(doc))
	);
	res.render("quotes/home", { quoteHeader, quoteCarasel, quotePick });
});

router.get("/index", async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const dataSize = await Quote.countDocuments({});
	let furtherRequest = true;

	if ((page - 1) * QUOTES_PER_PAGE > dataSize) {
		const maxPageNumber = Math.ceil(dataSize / QUOTES_PER_PAGE);
		return res.redirect(`/index?page=${maxPageNumber}`);
	}

	if (page * QUOTES_PER_PAGE > dataSize) {
		furtherRequest = false;
	}

	const quotes = await Quote.find({})
		.limit(QUOTES_PER_PAGE * page)
		.sort({ _id: -1 });

	res.render("quotes/index", { quotes, furtherRequest });
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const quote = await Quote.findById(id);

	res.render("quotes/show", { quote });
});

module.exports = { router, QUOTES_PER_PAGE };
