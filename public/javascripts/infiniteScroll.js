const quotesWrapper = document.querySelector(".quotes-wrapper");

window.onscroll = async function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        console.log("Bottom reached");

        const newDiv = document.createElement('div');        
        const quotes = await getQuoteData();

        quotes.forEach((quote) => {
            const html = template({ quote });
            newDiv.innerHTML += html;
        })

        addFocusOnScroll(newDiv);
        addQuoteExpandFold(newDiv);
        stopClickPropagationAnchors(newDiv);
        quotesWrapper.insertAdjacentElement("beforeend", newDiv);
    }
}

const getQuoteData = async () => {
    try {
        const res = await fetch("/api/quotes");
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("Something went wrong", err);
    }
}

const template = ejs.compile(`

    <div class="quote-container">
    <div class="quote">
        <p class="quote__singleQuotation">&#8220;</p>
        <p class="quote__short is-expanded"><%= quote.quoteShort %></p>
        <p class="quote__full is-hidden"><%- quote.partiallyBoldedQuote %></p>
        <div class="quote__source">
            <p><%= quote.author %><span class="quote__title is-hidden">, <%= quote.title %> </span></p>
            <a href="/<%= quote._id %>" class="quote__pagelink">Read More</a>
        </div>
    </div>
    <div class="quote-line"></div>
    <img class="quote-image"src="<%= quote.image %> " alt="">
    </div>
    <div class="break"></div>

`);