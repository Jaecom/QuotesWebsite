const addFocusOnScroll = (parent) => {
    const quotes = parent.querySelectorAll(".quote-box");

    window.addEventListener("scroll", () => {
        quotes.forEach((quote, index) => {
            if (isScrolledIntoView(quote)) {
                //do something when quotes comes into view
                
            } else {
                if (quote.classList.contains("shadow")) {
                //do something when quotes comes out of view

                }
            }
        });
    });
}

const stopClickPropagationAnchors = (parent) => {
    const quoteViewAnchors = parent.querySelectorAll(".quote__pagelink");
    for (quoteViewAnchor of quoteViewAnchors) {
        quoteViewAnchor.addEventListener("click", (event) => {
            event.stopPropagation();
        })
    }
}

function isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    const windowMid = window.innerHeight * 1 / 2;

    // When top and bottom is between midpoint in screen returns true
    const isVisible = (elemTop <= windowMid * 1.25 && elemBottom >= windowMid * 0.75);
    return isVisible;
}

addFocusOnScroll(document);
stopClickPropagationAnchors(document);