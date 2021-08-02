const container = document.querySelector(".quote-box-container");

const host = window.location.protocol + "//" + window.location.host;
const baseUrl = "/api/quotes";

let template;

//run before 
(async function () {
    template = ejs.compile(await fetchTemplateString());
})();

window.addEventListener("scroll", 
    throttle(async function () {
        if (reachBottom()) {
            if (noFurtherRequest) {
                return;
            }

            const quotes = await getQuoteData();
            createElementAndAppend(quotes);
            history.pushState(null, '', `?page=${nextPageCount}`);
            nextPageCount++;
        }
    }, 70)
)

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
    quotes.forEach((quote) => {
        const html = template({ quote });
        const elements = createElementFromHtml(html);
        elements.forEach((element) => {
            container.insertAdjacentElement("beforeend", element);
        })
    })
}

const createElementFromHtml = (htmlString) => {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    addFocusOnScroll(div);
    stopClickPropagationAnchors(div);
    return div.childNodes;
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
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
}

function throttle (callback, limit) {
    let waiting = false;                      // Initially, we're not waiting
    return function () {                      // We return a throttled function
        if (!waiting) {                       // If we're not waiting
            callback.apply(this, arguments);  // Execute users function
            waiting = true;                   // Prevent future invocations
            setTimeout(function () {          // After a period of time
                waiting = false;              // And allow future invocations
            }, limit);
        }
    }
}