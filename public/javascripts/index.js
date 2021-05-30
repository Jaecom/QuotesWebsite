const addFocusOnScroll = (parent) => {
    const quotes = parent.querySelectorAll(".quote");
    const quoteImages = parent.querySelectorAll(".quote-image");

    window.addEventListener("scroll", () => {
        quotes.forEach((quote, index) => {
            if (isScrolledIntoView(quote)) {
                quote.classList.add("is-focus")
                quoteImages[index].classList.add("is-focus")
            } else {
                if (quote.classList.contains("is-focus")) {
                    quote.classList.remove("is-focus")
                    quoteImages[index].classList.remove("is-focus")
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

const addQuoteExpandFold = (parent) => {
    const quotes = parent.querySelectorAll(".quote");
    const quoteFulls = parent.querySelectorAll(".quote__full");
    const quoteShorts = parent.querySelectorAll(".quote__short");
    const quoteTitles = parent.querySelectorAll(".quote__title");

    quotes.forEach((quote, index) => {
        let clickToExpand = true;
        const quoteFull = quoteFulls[index];
        const quoteShort = quoteShorts[index];
        const titleSpan = quoteTitles[index];

        quote.addEventListener("click", (event) => {
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
addQuoteExpandFold(document);
stopClickPropagationAnchors(document);

