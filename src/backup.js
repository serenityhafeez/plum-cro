// document.addEventListener("DOMContentLoaded", function () {
//     // Select the element that triggers the hover state activation
//     const perksLockElement = document.querySelector('.swipe-perks');
//     // Select all the flip-card elements
//     const flipCardElements = document.querySelectorAll('.flip-card');

//     const sparklesImgElement = document.querySelector('.sparkles-img');

//     const lockedElements = document.querySelectorAll('.locked');
//     const unlockedElements = document.querySelectorAll('.unlocked');


//     // Initially disable the hover state and animations by adding a disabled class
//     flipCardElements.forEach(flipCard => {
//         flipCard.classList.add('hover-disabled');
//     });

//     /* if (sparklesImgElement) {
//          sparklesImgElement.style.opacity = 0;
//          sparklesImgElement.style.transition = 'opacity 2s';
//      }*/



//     // Enable hover state and animations on click of the perks-lock element
//     perksLockElement.addEventListener('click', function () {
//         flipCardElements.forEach(flipCard => {
//             flipCard.classList.remove('hover-disabled');
//             flipCard.classList.add('hover-enabled'); // Optionally add a class to indicate it's enabled
//             document.body.classList.add('unlocked');
//         });

//         if (sparklesImgElement) {
//             sparklesImgElement.style.opacity = 1;
//         }

//         lockedElements.forEach(locked => {
//             locked.classList.add('hide');
//         });
//         unlockedElements.forEach(unlocked => {
//             unlocked.classList.remove('hide');
//         });


//     });


//     /* if (sparklesImgElement) {
//          sparklesImgElement.addEventListener('transitionend', function () {
//              if (sparklesImgElement.style.opacity == 1) {
//                  sparklesImgElement.classList.add('blinking');
//              }
//          });
//      }*/

//     /*const customCursor = document.getElementById('customCursor');
//     const perksHero = document.querySelector('.perks-hero');

//     perksHero.addEventListener('mouseenter', function () {
//         customCursor.style.opacity = '1';
//     });

//     perksHero.addEventListener('mouseleave', function () {
//         customCursor.style.opacity = '0';
//     });

//     perksHero.addEventListener('mousemove', function (e) {
//         const rect = perksHero.getBoundingClientRect();
//         customCursor.style.transform = `translate3d(${e.clientX - rect.left}px, ${e.clientY - rect.top}px, 0)`;
//     });*/



// });


// // document.addEventListener("DOMContentLoaded", function () {
// //     // Select the element that triggers the hover state activation
// //     const perksLockElement = document.querySelector('.swipe-perks');
// //     // Select all the flip-card elements
// //     const flipCardElements = document.querySelectorAll('.flip-card');

// //     const sparklesImgElement = document.querySelector('.sparkles-img');

// //     const lockedElements = document.querySelectorAll('.locked');
// //     const unlockedElements = document.querySelectorAll('.unlocked');

// //     // Initially disable the hover state and animations by adding a disabled class
// //     flipCardElements.forEach(flipCard => {
// //         flipCard.classList.add('hover-disabled');
// //     });

// //     // Enable hover state and animations on click of the perks-lock element
// //     perksLockElement.addEventListener('click', function () {
// //         flipCardElements.forEach(flipCard => {
// //             flipCard.classList.remove('hover-disabled');
// //             flipCard.classList.add('hover-enabled'); // Optionally add a class to indicate it's enabled
// //             document.body.classList.add('unlocked');
// //         });

// //         if (sparklesImgElement) {
// //             sparklesImgElement.style.opacity = 1;
// //         }

// //         lockedElements.forEach(locked => {
// //             locked.classList.add('hide');
// //         });
// //         unlockedElements.forEach(unlocked => {
// //             unlocked.classList.remove('hide');
// //         });
// //     });

// //     var toggle = document.querySelector('.toggle-container');
// //     var handle = document.querySelector('.toggle-handle');
// //     var label = document.querySelector('.toggle-label');

// //     if (!toggle || !handle || !label) {
// //         console.error("One or more elements are missing:");
// //         if (!toggle) console.error("Missing .toggle-container");
// //         if (!handle) console.error("Missing .toggle-handle");
// //         if (!label) console.error("Missing .toggle-label");
// //         return;
// //     }

// //     var isDragging = false;
// //     var startX = 0;
// //     var currentX = 0;

// //     toggle.addEventListener('mousedown', startDrag, false);
// //     document.addEventListener('mousemove', onDrag, false);
// //     document.addEventListener('mouseup', endDrag, false);

// //     toggle.addEventListener('touchstart', startDrag, false);
// //     document.addEventListener('touchmove', onDrag, false);
// //     document.addEventListener('touchend', endDrag, false);

// //     function startDrag(evt) {
// //         console.log("Drag started");
// //         isDragging = true;
// //         startX = evt.type.includes('touch') ? evt.touches[0].clientX : evt.clientX;
// //         handle.style.transition = 'none';
// //     }

// //     function onDrag(evt) {
// //         if (!isDragging) return;
// //         currentX = evt.type.includes('touch') ? evt.touches[0].clientX : evt.clientX;
// //         var diffX = Math.min(Math.max(currentX - startX, 0), toggle.offsetWidth - handle.offsetWidth);
// //         handle.style.transform = `translateX(${diffX}px)`;
// //         toggle.style.opacity = 1 - diffX / (toggle.offsetWidth - handle.offsetWidth);
// //         console.log("Dragging: ", diffX);
// //     }

// //     function endDrag() {
// //         if (!isDragging) return;
// //         console.log("Drag ended");
// //         isDragging = false;
// //         handle.style.transition = 'transform 0.3s';
// //         if (currentX - startX > toggle.offsetWidth / 2) {
// //             handle.style.transform = `translateX(${toggle.offsetWidth - handle.offsetWidth}px)`;
// //             setTimeout(function () {
// //                 toggle.style.transition = 'opacity 0.3s';
// //                 toggle.style.opacity = '0';
// //                 setTimeout(function () {
// //                     toggle.style.display = 'none';
// //                     enableFlipCards(); // Enable flip cards and change lock/unlock visibility
// //                 }, 300);
// //             }, 300);
// //         } else {
// //             handle.style.transform = 'translateX(0)';
// //             toggle.style.opacity = '1';
// //             label.textContent = 'swipe to unlock';
// //         }
// //     }

// //     function enableFlipCards() {
// //         flipCardElements.forEach(flipCard => {
// //             flipCard.classList.remove('hover-disabled');
// //             flipCard.classList.add('hover-enabled');
// //         });

// //         lockedElements.forEach(locked => {
// //             locked.classList.add('hide');
// //         });

// //         unlockedElements.forEach(unlocked => {
// //             unlocked.classList.remove('hide');
// //         });
// //     }
// // });
