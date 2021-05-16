const quoteContainers = document.querySelectorAll(".quote-container");
const quoteTitleSpans = document.querySelectorAll(".quote-title");
const quoteFullContainers = document.querySelectorAll(".quote-full");
const quoteShortContainers = document.querySelectorAll(".quote-short");
quoteContainers.forEach((expandButton, index) => {
    let clickToExpand = true;
    const quoteFull = quoteFullContainers[index];
    const quoteShort = quoteShortContainers[index];
    const titleSpan = quoteTitleSpans[index];

    expandButton.addEventListener("click", (event) => {
        event.stopPropagation();

        if (clickToExpand) {
            //expanding
            clickToExpand = false;
            quoteFull.classList.remove("quote-hide");
            quoteShort.classList.add("quote-hide");
            quoteShort.classList.remove("enlarge");
            titleSpan.classList.remove("quote-hide");
            setTimeout(() => {
                quoteFull.classList.add("enlarge");
            }, 5)
        } else {
            //collasping
            quoteFull.classList.remove("enlarge");
            titleSpan.classList.add("quote-hide");

            quoteFull.addEventListener("transitionend", () => {
                quoteFull.classList.add("quote-hide");
                quoteShort.classList.remove("quote-hide");
                setTimeout(() => {
                    quoteShort.classList.add("enlarge")
                }, 5)
            }, { once: true })
            clickToExpand = true;
        }
    })
});

