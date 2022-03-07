let localDb = false;

if (process.env.NODE_ENV !== "production") {
	//if not built by heroku(when in development)
	//will use .env file to load variables to process.env
	require("dotenv").config();
	// localDb = true;
}

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");

// development enviroment
if (process.env.NODE_ENV !== "production") {
	const livereload = require("livereload");
	const connectLiveReload = require("connect-livereload");

	const liveReloadServer = livereload.createServer();
	liveReloadServer.watch(path.join(__dirname, "/public"));
	app.use(connectLiveReload());

	liveReloadServer.server.once("connection", () => {
		setTimeout(() => {
			liveReloadServer.refresh("/");
		}, 100);
	});
}

const uri = localDb ? "mongodb://localhost:27017/quoteWebsite" : process.env.DB_URL;

mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	const message = localDb ? "local" : "online";
	console.log(`Database connected: ${message}`);
});

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

const quotesRouter = require("./routes/quotes").router;
const apiRouter = require("./routes/api");

app.use("/", quotesRouter);
app.use("/api", apiRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
