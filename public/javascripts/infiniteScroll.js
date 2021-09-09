import { throttle } from "./util.js";

const container = document.querySelector(".quote-index-container");

const base = window.location.protocol + "//" + window.location.host;
const currentUrl = "/api/quotes";

const params = new URL(document.location).searchParams;

let template;
let nextPage = (parseInt(params.get("page")) || 1) + 1;
let pageLoaded = true;

//fetch template string from
(async function () {
	template = ejs.compile(await fetchTemplateString());
})();

window.addEventListener(
	"scroll",
	throttle(async function () {
		if (reachBottom() && furtherRequest && pageLoaded) {
			pageLoaded = false;

			const quotes = await getQuoteData();
			appendElements(quotes);
			history.pushState(null, "", `?page=${nextPage++}`);

			pageLoaded = true;
		}
	}, 70)
);

const getQuoteData = async () => {
	try {
		const url = new URL(currentUrl, base);
		url.searchParams.append("page", nextPage);
		
		const res = await fetch(url);
		const data = await res.json();

		console.log(data);

		if (data.lastPage) {
			furtherRequest = false;
		}

		return data.quotes;
	} catch (err) {
		console.log("Something went wrong", err);
	}
};

const appendElements = (quotes) => {
	quotes.forEach((quote) => {
		const html = template({ quote });
		const elements = createElements(html);
		elements.forEach((element) => {
			container.insertAdjacentElement("beforeend", element);
		});
	});
};

const createElements = (htmlString) => {
	const div = document.createElement("div");
	div.innerHTML = htmlString.trim();
	return div.childNodes;
};

async function fetchTemplateString() {
	try {
		const res = await fetch("/api/templates/quote");
		const data = await res.json();
		return data.html;
	} catch (err) {
		console.log("Something went wrong", err);
	}
}

const reachBottom = () => {
	return (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
	);
};
