const selectQuote = document.querySelector(".select__quote");
const selectTitle = document.querySelector(".select__title");
const pick = document.querySelector(".select__pick");

const authorSpans = pick.querySelectorAll(".select__span");
let currentAuthor = null;

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
        currentAuthor.classList.remove("select__span--selected");
    }

    element.classList.add("select__span--selected")
    currentAuthor = element;
}

function updateQuote(index) {
    selectQuote.textContent = quotePick[index].quoteShort;
    selectTitle.textContent = quotePick[index].title;
}

