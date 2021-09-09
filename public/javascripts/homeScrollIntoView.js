import { isScrolledIntoView, throttle } from "./util.js";

const cardCarasel = document.querySelector(".card-carasel");

window.addEventListener(
	"scroll",
	throttle(function () {
		if (isScrolledIntoView(cardCarasel)) {
			
		}
	}, 100)
);
