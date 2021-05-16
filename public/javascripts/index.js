const quoteContainers = document.querySelectorAll(".quote-container");
const quoteTitleSpans = document.querySelectorAll(".quote-title");
const quoteFullContainers = document.querySelectorAll(".quote-full");
const quoteShortContainers = document.querySelectorAll(".quote-short");
const quoteViewAnchors = document.querySelectorAll(".quote-view-more");

highlightFirstElement();

window.addEventListener("scroll", () => {
    for (quoteContainer of quoteContainers) {
        if (isScrolledIntoView(quoteContainer)) {
            quoteContainer.classList.add("focus")
        } else {
            quoteContainer.classList.remove("focus")
        }
    }
});


for(quoteViewAnchor of quoteViewAnchors) {
    quoteViewAnchor.addEventListener("click", (event) => {
        event.stopPropagation();
    })
}

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


function isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    const windowMid = window.innerHeight / 2;

    // When top and bottom is between midpoint in screen returns true
    const isVisible = (elemTop <= windowMid && elemBottom >= windowMid);
    return isVisible;
}


function highlightFirstElement() {
    quoteContainers[0].classList.add("focus");
}