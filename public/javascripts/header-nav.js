import { domTransition } from "./util.js";

const header = document.querySelector(".header");

const navItems = header.querySelectorAll(".header-nav__item");
const bgImages = header.querySelectorAll(".header__bg");

const headerGrid = document.querySelector(".header__grid");
const keywords = header.querySelector(".header__keyword");
const quoteText = header.querySelector(".header__quote");
const author = header.querySelector(".header__author");
const book = header.querySelector(".header__book");

let currentNavItem = header.querySelector(".header-nav__item--selected");
let currentImage = header.querySelector(".header__bg--front");

navItems.forEach((item, index) => {
	item.addEventListener("click", () => {
		selectNavItem(item);
		updateBackground(index);
		updateHeaderText(index);
	});
});

function updateHeaderText(index) {
	const quote = quoteHeader[index];

	domTransition(headerGrid, "header__grid--transform", () => {
		keywords.textContent = quote.keywords;
		quoteText.textContent = quote.quoteExcludeKeywords;
		author.textContent = quote.author;
		book.textContent = quote.title;
	});
}

function updateBackground(index) {
	currentImage.classList.remove("header__bg--front");
	currentImage = bgImages[index];
	currentImage.classList.add("header__bg--front");
}

function selectNavItem(item) {
	currentNavItem.classList.remove("header-nav__item--selected");
	item.classList.add("header-nav__item--selected");
	currentNavItem = item;
}
