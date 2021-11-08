/* Animations */

var scrollRevealElements = document.querySelectorAll('.scrollReveal');
var scrollDown = document.querySelectorAll('#scrollDown');


var scrollHoverHop = anime({
    targets: scrollDown,
    translateY: -15,
    direction: 'alternate',
    easing: 'easeOutQuad',
    loop: true,
})

const handleScrollReveal = () => {

    const scrollOffset = (window.innerHeight) * .10

    const isInView = (element) => {
        elementDistance = element.getBoundingClientRect().top
        return elementDistance <= (window.innerHeight - scrollOffset)
    }

    scrollRevealElements.forEach((textElement) => {
        if (isInView(textElement)) {
            textElement.classList.add('display')
        }
    })
}

window.onload = () => {
    handleScrollReveal();
};

window.addEventListener('scroll', () => {
    handleScrollReveal();
})
   