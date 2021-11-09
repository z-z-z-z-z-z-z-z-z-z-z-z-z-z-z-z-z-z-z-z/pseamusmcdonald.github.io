/* HTML Elements */

let scrollRevealElements = document.querySelectorAll('.scrollReveal');
let scrollDown = document.querySelector('#scrollDown');
let arrowSvg = document.querySelector('#contactArrowHeadPath');
let arrowHeadPath = document.querySelector('#contactArrowHead > path');
let themeButtons = document.querySelectorAll('.lightModeButton');

/* Variables */

const defaultTheme = "dark";
const scrollOffset = (window.innerHeight) * (.10);
let currentTheme;
let arrowPlayed = false;

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
    targets: arrowSvg,
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
    return elementDistance <= (window.innerHeight - scrollOffset);
}

const handleScrollReveal = () => {

    scrollRevealElements.forEach((textElement) => {
        if (isInView(textElement)) {
            textElement.classList.add('display');
        }
    })

    if(isInView(arrowSvg) && !arrowPlayed) {
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

/* Window Event Handlers */

window.onload = () => {
    handleScrollReveal();
    handleThemeModeOnLoad();
};

window.addEventListener('scroll', () => {
    handleScrollReveal();
})
   