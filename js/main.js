/* Animations */

var scrollRevealElements = document.querySelectorAll('.scrollReveal');
var scrollDown = document.querySelector('#scrollDown');
var arrowSvg = document.querySelector('#contactArrowHeadPath');
var arrowHeadPath = document.querySelector('#contactArrowHead > path');

var themeButtons = document.querySelectorAll('.lightModeButton');

const defaultTheme = "dark";
let currentTheme;
const scrollOffset = (window.innerHeight) * (.10);
var arrowPlayed = false;

const isInView = (element) => {
    elementDistance = element.getBoundingClientRect().top;
    return elementDistance <= (window.innerHeight - scrollOffset);
}

var scrollHoverHop = anime({
    targets: scrollDown,
    translateY: -15,
    direction: 'alternate',
    easing: 'easeOutQuad',
    loop: true,
});

var arrowHeadDraw = anime({
    targets: arrowHeadPath,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 600,
    loop: false,
    autoplay: false,
    direction: 'alternate',
});

var arrowDrawPath = anime({
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
    var currentTheme = document.documentElement.getAttribute("theme-mode");
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

window.onload = () => {
    handleScrollReveal();
    handleThemeModeOnLoad();
};

window.addEventListener('scroll', () => {
    handleScrollReveal();
})
   