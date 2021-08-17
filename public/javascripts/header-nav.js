const header = document.querySelector(".header");

const navItems = header.querySelectorAll(".header-nav__item");
const bgImages = header.querySelectorAll(".header__bg");

const keywords = header.querySelector(".header__keyword");
const quoteText = header.querySelector(".header__quote");
const author = header.querySelector(".header__author");
const book = header.querySelector(".header__book");
const circle = header.querySelector(".header__circle");
const square = header.querySelector(".header__square");
const label = header.querySelector(".header__label");

let currentNavItem = header.querySelector(".header-nav__item--selected");
let currentImage = header.querySelector(".header__bg--front");

navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        const quote = quoteHeader[index];

        selectNavItem(item);
        updateBackground(bgImages[index]);

        domTransition(keywords, quote.keywords, "header-slide-left");
        domTransition(quoteText, quote.quoteExcludeKeywords, "header-slide-bottom");
        domTransition(author, quote.author, "header-slide-right");
        domTransition(book, quote.title, "header-slide-bottom");
        domTransition(circle, null, "header-slide-left");
        domTransition(square, null, "header-slide-left");
        domTransition(label, null, "header-slide-label");
    })
});

function domTransition(dom, content, classToRemove) {
    dom.addEventListener("transitionend", () => {
        if(content !== null) {
            dom.textContent = content;
        }
        dom.classList.remove(classToRemove);
    }, { once: true });    
    dom.classList.add(classToRemove);
};

function selectNavItem(item) {
    currentNavItem.classList.remove("header-nav__item--selected");
    item.classList.add("header-nav__item--selected");
    currentNavItem = item;
}

function updateBackground(background) {
    currentImage.classList.remove("header__bg--front");
    currentImage = background;
    currentImage.classList.add("header__bg--front");
}