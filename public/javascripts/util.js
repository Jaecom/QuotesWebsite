export function domTransition(dom, classToAdd, callback) {
    dom.addEventListener("transitionend", () => {
        callback();
        dom.classList.remove(classToAdd);
    }, { once: true }); 

    if(!dom.classList.contains(classToAdd)) {
        dom.classList.add(classToAdd);
    } else {
        dom.classList.remove(classToAdd);
    }
};

export function isScrolledIntoView(el, full = false) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    const windowMid = window.innerHeight * 1 / 2;

    if(full) {
        const isVisible = (elemTop <= windowMid * .5 && elemBottom >= windowMid);
        return isVisible;
    } else {
        // When top and bottom is between midpoint in screen returns true
        const isVisible = (elemTop <= windowMid && elemBottom >= windowMid);
        return isVisible;
    }
}

export function throttle (callback, limit) {
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