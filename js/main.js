/* Animations */

var scrollRevealElements = document.querySelectorAll('.scrollReveal');
var scrollDown = document.querySelector('#scrollDown');
var arrowSvg = document.querySelector('#contactArrowPath')
var arrowHeadPath = document.querySelector('#contactArrowHead > path')

const scrollOffset = (window.innerHeight) * .10
var arrowPlayed = false;

const isInView = (element) => {
    elementDistance = element.getBoundingClientRect().top
    return elementDistance <= (window.innerHeight - scrollOffset)
}

var scrollHoverHop = anime({
    targets: scrollDown,
    translateY: -15,
    direction: 'alternate',
    easing: 'easeOutQuad',
    loop: true,
})

var arrowHeadDraw = anime({
    targets: arrowHeadPath,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 600,
    loop: false,
    autoplay: false,
    direction: 'alternate',
})

var arrowDrawPath = anime({
    targets: arrowSvg,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 2000,
    loop: false,
    autoplay: false,
    direction: 'alternate',
    complete: function(anim) {
        anim.complete ? arrowHeadDraw.play() : null
    }
})

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
}

window.onload = () => {
    handleScrollReveal();
};

window.addEventListener('scroll', () => {
    handleScrollReveal();
})
   