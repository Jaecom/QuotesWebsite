import { isScrolledIntoView, throttle } from "./util.js";

const segmentAll = document.querySelectorAll(".segment");

window.addEventListener(
    "scroll",
	throttle(function () {
        segmentAll.forEach((segment) => {
            let flag = true; 

            if(isScrolledIntoView(segment, true) && flag) {
                segment.classList.add("segment--transform");
                flag = false;
            } else {
                segment.classList.remove("segment--transform");
            }
        })
    }, 70)
);
