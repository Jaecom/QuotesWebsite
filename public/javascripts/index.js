const quoteContainers = document.querySelectorAll(".quote");
const quoteTitleSpans = document.querySelectorAll(".quote__title");
const quoteFullContainers = document.querySelectorAll(".quote__full");
const quoteShortContainers = document.querySelectorAll(".quote__short");
const quoteViewAnchors = document.querySelectorAll(".quote__pagelink");

window.addEventListener("scroll", () => {
    for (quoteContainer of quoteContainers) {

        const previousEl = quoteContainer.previousElementSibling
        const nextEl = quoteContainer.nextElementSibling

        if (isScrolledIntoView(quoteContainer)) {
            quoteContainer.classList.add("is-focus")
        } else {
            if(quoteContainer.classList.contains("is-focus")) {
                quoteContainer.classList.remove("is-focus")
            }
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
            quoteFull.classList.remove("is-hidden");
            quoteShort.classList.add("is-hidden");
            quoteShort.classList.remove("is-expanded");
            titleSpan.classList.remove("is-hidden");
            setTimeout(() => {
                quoteFull.classList.add("is-expanded");
            }, 5)
        } else {
            //collasping
            quoteFull.classList.remove("is-expanded");
            titleSpan.classList.add("is-hidden");

            quoteFull.addEventListener("transitionend", () => {
                quoteFull.classList.add("is-hidden");
                quoteShort.classList.remove("is-hidden");
                setTimeout(() => {
                    quoteShort.classList.add("is-expanded")
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
    const windowMid = window.innerHeight * 1/3;

    // When top and bottom is between midpoint in screen returns true
    const isVisible = (elemTop <= windowMid && elemBottom >= windowMid);
    return isVisible;
}
