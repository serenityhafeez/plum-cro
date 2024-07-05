document.addEventListener("DOMContentLoaded", function () {
    // Select the element that triggers the hover state activation
    const perksLockElement = document.querySelector('.perks-lock');
    // Select all the flip-card elements
    const flipCardElements = document.querySelectorAll('.flip-card');

    const sparklesImgElement = document.querySelector('.sparkles-img');

    const lockedElements = document.querySelectorAll('.locked');
    const unlockedElements = document.querySelectorAll('.unlocked');


    // Initially disable the hover state and animations by adding a disabled class
    flipCardElements.forEach(flipCard => {
        flipCard.classList.add('hover-disabled');
    });

    if (sparklesImgElement) {
        sparklesImgElement.style.opacity = 0;
        sparklesImgElement.style.transition = 'opacity 2s';
    }



    // Enable hover state and animations on click of the perks-lock element
    perksLockElement.addEventListener('click', function () {
        flipCardElements.forEach(flipCard => {
            flipCard.classList.remove('hover-disabled');
            flipCard.classList.add('hover-enabled'); // Optionally add a class to indicate it's enabled
        });

        if (sparklesImgElement) {
            sparklesImgElement.style.opacity = 1;
        }

        lockedElements.forEach(locked => {
            locked.classList.add('hide');
        });
        unlockedElements.forEach(unlocked => {
            unlocked.classList.remove('hide');
        });


    });


    if (sparklesImgElement) {
        sparklesImgElement.addEventListener('transitionend', function () {
            if (sparklesImgElement.style.opacity == 1) {
                sparklesImgElement.classList.add('blinking');
            }
        });
    }

    const customCursor = document.getElementById('customCursor');
    const perksHero = document.querySelector('.perks-hero');

    perksHero.addEventListener('mouseenter', function () {
        customCursor.style.opacity = '1';
    });

    perksHero.addEventListener('mouseleave', function () {
        customCursor.style.opacity = '0';
    });

    perksHero.addEventListener('mousemove', function (e) {
        const rect = perksHero.getBoundingClientRect();
        customCursor.style.transform = `translate3d(${e.clientX - rect.left}px, ${e.clientY - rect.top}px, 0)`;
    });



});