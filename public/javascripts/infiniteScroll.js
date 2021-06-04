const quotesWrapper = document.querySelector(".quotes-wrapper");

const host = window.location.protocol + "//" + window.location.host;
const baseUrl = "/api/quotes";

let template;

//run before 
(async function () {
    template = ejs.compile(await fetchTemplateString());
})();


window.onscroll = async function () {
    if (reachBottom()) {

        if (noFurtherRequest) {
            return;
        }

        const quotes = await getQuoteData();
        createElementAndAppend(quotes);
        history.pushState(null, '', `?page=${nextPageCount}`);
        nextPageCount++;
    }
}

const getQuoteData = async () => {
    try {
        const urlWithParams = new URL(baseUrl, host);
        urlWithParams.searchParams.append("page", nextPageCount);
    
        console.log(urlWithParams);

        const res = await fetch(urlWithParams);
        const data = await res.json();

        console.log(data)

        if (data.lastPage) {
            noFurtherRequest = true;
        }
        
        return data.quotes;
    } catch (err) {
        console.log("Something went wrong", err);
    }
}


const createElementAndAppend = (quotes) => {
    const div = document.createElement('div');
    quotes.forEach((quote) => {
        const html = template({ quote });
        div.innerHTML += html;
    })

    addFocusOnScroll(div);
    stopClickPropagationAnchors(div);
    quotesWrapper.insertAdjacentElement("beforeend", div);
}

async function fetchTemplateString() {
    try {
        const res = await fetch("/api/templates/quote");
        const data = await res.json();
        return data.html;
    } catch (err) {
        console.log("Something went wrong", err);
    }
}

const reachBottom = () => {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 150;
}