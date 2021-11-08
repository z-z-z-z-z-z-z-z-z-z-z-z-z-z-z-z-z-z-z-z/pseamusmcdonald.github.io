/* Animations */

var textElements = document.querySelectorAll('.animatedText');

var scrollDown = document.querySelectorAll('#scrollDown');

var scrollHoverHop = anime({
    targets: scrollDown,
    translateY: -15,
    direction: 'alternate',
    easing: 'easeOutQuad',
    loop: true,
})