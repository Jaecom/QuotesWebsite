const selectQuote = document.querySelector(".quote-select__quote");
const selectTitle = document.querySelector(".quote-select__title");
const pick = document.querySelector(".quote-select__pick");
const display = document.querySelector(".quote-select__display");

const authorSpans = pick.querySelectorAll(".quote-select__span");
let currentAuthor = null;

setInterval(selectRandomAuthor, 5 * 1000);
selectRandomAuthor();

authorSpans.forEach((element, index) => {
    element.addEventListener("mouseover", () => {
        selectAuthor(element);
        // domTransition(displayText, quotePick[index].quoteShort, "select--hide");
        updateQuote(index);
    });
});

function selectRandomAuthor() {
    const randomIndex = Math.floor(Math.random() * authorSpans.length);
    selectAuthor(authorSpans[randomIndex]);
    updateQuote(randomIndex);
}

function selectAuthor(element) {
    if(currentAuthor !== null) {
        currentAuthor.classList.remove("quote-select__span--selected");
    }

    element.classList.add("quote-select__span--selected")
    currentAuthor = element;
}

function updateQuote(index) {
    display.addEventListener("transitionend", () => {
        selectQuote.textContent = quotePick[index].quoteShort;
        selectTitle.textContent = quotePick[index].title;
        display.classList.remove("quote-select--hide");
    });
    display.classList.add("quote-select--hide");
}

