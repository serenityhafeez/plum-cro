document.addEventListener('scroll', function () {

    const popup = document.querySelector('.healthy-team-popup');
    if (!popup) return;

    const scrollPosition = window.scrollY + window.innerHeight;
    const scrollThreshold = document.body.scrollHeight * 0.3;

    if (scrollPosition >= scrollThreshold) {
        popup.classList.add('visible');
    } else {
        popup.classList.remove('visible');
    }
});