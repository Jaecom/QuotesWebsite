import { domTransition, isScrolledIntoView } from "./util.js";

const select = document.querySelector(".quote-select");

const selectQuote = select.querySelector(".quote-select__quote");
const selectTitle = select.querySelector(".quote-select__title");
const pick = select.querySelector(".quote-select__pick");
const content = select.querySelector(".quote-select__content");

const authorSpans = pick.querySelectorAll(".quote-select__author");
let currentAuthor = null;
let previousIndex = null;

const SECONDS_BEFORE_CHANGE = 4;

selectRandomAuthor();
let interval = null;

window.addEventListener("scroll", () => {
	if (isScrolledIntoView(select)) {
		if (interval === null) {
			console.log("setting interval");
			interval = setRandomInterval();
		}
	} else {
		if (interval !== null) {
			console.log("removing interval");
			clearInterval(interval);
			interval = null;
		}
	}
});

authorSpans.forEach((element, index) => {
	element.addEventListener("mouseover", () => {
		resetInterval()
		loadImage(index);
		selectAuthor(index);
		updateQuote(index);
	});
});

function resetInterval() {
	clearInterval(interval);
	interval = setRandomInterval();
}

function setRandomInterval() {
	return setInterval(selectRandomAuthor, SECONDS_BEFORE_CHANGE * 1000);
}

function selectRandomAuthor() {
	const index = generateUniqueRandomIndex();

	loadImage(index);
	selectAuthor(index);
	updateQuote(index);
}

function generateUniqueRandomIndex() {
	while (true) {
		const random = Math.floor(Math.random() * authorSpans.length);
		if (random !== previousIndex) {
			previousIndex = random;
			return random;
		}
	}
}

function selectAuthor(index) {
	const author = authorSpans[index];

	if (currentAuthor !== null) {
		currentAuthor.classList.remove("quote-select__author--selected");
	}

	author.classList.add("quote-select__author--selected");
	currentAuthor = author;
}

function updateQuote(index) {
	domTransition(content, "quote-select--hide", () => {
		selectQuote.textContent = quotePick[index].quoteShort;
		selectTitle.textContent = quotePick[index].title;
	});
}

let imageFront = select.querySelector(".quote-select__image--front");
let imageBack = select.querySelector(".quote-select__image--back");

function loadImage(index) {
	const newImg = new Image();
	newImg.onload = function () {
		if (imageBack.src === null) {
			imageBack.src = this.src;
		}
		swapImage(this.src);
	};

	newImg.src = quotePick[index].imageMedium;
}

function swapImage(newImage) {
	imageBack.src = imageFront.src;

	imageFront.addEventListener(
		"transitionend",
		() => {
			imageFront.src = newImage;
			imageFront.classList.remove("quote-select__image--hide");
		},
		{ once: true }
	);
	imageFront.classList.add("quote-select__image--hide");
}
