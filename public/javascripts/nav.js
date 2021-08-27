const nav = document.querySelector(".nav");

let lastScrollTop = 0;


window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if(currentScroll > lastScrollTop) {
        //scroll down
        nav.classList.add("nav--hide");
        nav.classList.add("nav--background");
        nav.style.color = "white"
    } else if (currentScroll < lastScrollTop) {
        //scroll up
        nav.classList.remove("nav--hide");
    }

    lastScrollTop = currentScroll;

})