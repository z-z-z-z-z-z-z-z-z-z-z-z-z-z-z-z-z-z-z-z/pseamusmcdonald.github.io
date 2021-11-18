/* Variables */

const defaultTheme = "dark";
const scrollOffset = (window.innerHeight) * (.08);
let currentTheme;
let arrowPlayed = false;

/* HTML Elements */

let scrollRevealElements = document.querySelectorAll('.scrollReveal');
let scrollDown = document.querySelector('#scrollDown');
let arrowSvg = document.querySelector('#contactArrowPath');
let arrowSvgMobile = document.querySelector('#contactArrowPathMobile')
let arrowHeadPath = document.querySelectorAll('#contactArrowHead > path');
let themeButtons = document.querySelectorAll('.lightModeButton');

/* AnimeJS Animation Objects */

let scrollHoverHop = anime({
    targets: scrollDown,
    translateY: -15,
    direction: 'alternate',
    easing: 'easeOutQuad',
    loop: true,
});

let arrowHeadDraw = anime({
    targets: arrowHeadPath,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 600,
    loop: false,
    autoplay: false,
    direction: 'alternate',
});

let arrowDrawPath = anime({
    targets: [arrowSvg, arrowSvgMobile],
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1600,
    loop: false,
    autoplay: false,
    direction: 'alternate',
    complete: function(anim) {
        anim.complete ? arrowHeadDraw.play() : null
    }
});

/* Animation Helper Functions */

const isInView = (element) => {
    elementDistance = element.getBoundingClientRect().top;
    if (elementDistance === 0) {
        return false
    }
    return elementDistance <= (window.innerHeight - scrollOffset);
}

const handleScrollReveal = () => {
    scrollRevealElements.forEach((hiddenElement) => {
        if (isInView(hiddenElement)) {
            hiddenElement.classList.add('display');
			if (hiddenElement.classList.contains("scrollingText")) {
				handleScrollingText(hiddenElement);
			}
        }
    })

    if ((isInView(arrowSvg) || isInView(arrowSvgMobile)) && !arrowPlayed) {
        console.log(arrowHeadPath)
        arrowDrawPath.play();
        arrowPlayed = true;
    }
};

const handleThemeModeOnLoad = () => {
    document.documentElement.setAttribute("theme-mode", "dark");
};

const switchTheme = () => {
    let currentTheme = document.documentElement.getAttribute("theme-mode");
    return currentTheme === "dark" ? "light" : "dark"
}

const handleThemeModeClick = (element) => {
    themeButtons.forEach(themeButton => {
        themeButton.removeAttribute("disabled")
    })
    element.setAttribute("disabled", "")
    document.documentElement.setAttribute("theme-mode", switchTheme());
    console.log(document.documentElement.getAttribute("theme-mode"))
};

const handleScrollingText = (textElement) => {
	const textElementWidth = textElement.getBoundingClientRect().width;
	if (textElementWidth > window.innerWidth - (window.innerWidth * .10)) {
		textElement.classList.add("initialScrollingText");
		textElement.style.animation  = `initial-animation ${textElementWidth/30}s linear 1s`
	} else textElement.classList.remove("initialScrollingText");
	textElement.onanimationend = () => {
		textElement.classList.remove("initialScrollingAnimation")
		textElement.classList.add("activeScrollingText");
		textElement.style.animation  = `active-animation ${textElementWidth/30}s linear infinite`
	}
}

/* Window Event Handlers */

window.onload = () => {
    handleScrollReveal();
    handleThemeModeOnLoad();
	handleScrollingText();
};

window.onresize = () => {
	handleScrollingText();
}

window.onscroll = () => {
    handleScrollReveal();
};