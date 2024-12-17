/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/perks.js":
/*!**********************!*\
  !*** ./src/perks.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n\n    const flipCardElements = document.querySelectorAll('.flip-card');\n    const lockedElements = document.querySelectorAll('.locked');\n    const unlockedElements = document.querySelectorAll('.unlocked');\n\n\n\n\n\n    // Replace \"lottieAnimationID\" with the ID or class of your Lottie animation element\n    const animation = lottie.loadAnimation({\n        container: document.getElementById('lottieAnimationID'),\n        renderer: 'svg',\n        loop: false,\n        autoplay: false,\n        path: 'https://uploads-ssl.webflow.com/63413ad4dec8a91fe53f4fb0/66963677c035e42a9e6dafd3_Lock.json' // Replace with the file path to your Lottie JSON file\n    });\n\n    // Play the animation\n    function playAnimation() {\n        animation.play();\n    }\n\n    // Pause the animation\n    function pauseAnimation() {\n        animation.pause();\n    }\n\n    // Stop and reset the animation\n    function stopAnimation() {\n        animation.stop();\n        animation.goToAndStop(0, true);\n    }\n\n    // Initially disable the hover state and animations by adding a disabled class\n    flipCardElements.forEach(flipCard => {\n        flipCard.classList.add('hover-disabled');\n\n    });\n\n\n    pauseAnimation()\n\n\n    var toggle = document.querySelector('.toggle-container');\n    var handle = document.querySelector('.toggle-handle');\n    var label = document.querySelector('.toggle-label');\n\n    if (!toggle || !handle || !label) {\n        console.error(\"One or more elements are missing:\");\n        if (!toggle) console.error(\"Missing .toggle-container\");\n        if (!handle) console.error(\"Missing .toggle-handle\");\n        if (!label) console.error(\"Missing .toggle-label\");\n        return;\n    }\n\n    var isDragging = false;\n    var startX = 0;\n    var currentX = 0;\n\n    toggle.addEventListener('mousedown', startDrag, false);\n    document.addEventListener('mousemove', onDrag, false);\n    document.addEventListener('mouseup', endDrag, false);\n\n    toggle.addEventListener('touchstart', startDrag, false);\n    document.addEventListener('touchmove', onDrag, false);\n    document.addEventListener('touchend', endDrag, false);\n\n    function enableFlipCards() {\n        flipCardElements.forEach(flipCard => {\n            flipCard.classList.remove('hover-disabled');\n            flipCard.classList.add('hover-enabled');\n\n        });\n\n        lockedElements.forEach(locked => {\n            locked.classList.add('hide');\n            scrolledDown.classList.add('hide');\n        });\n\n        unlockedElements.forEach(unlocked => {\n            unlocked.classList.remove('hide');\n        });\n\n\n\n\n\n\n\n    }\n\n    function startDrag(evt) {\n        isDragging = true;\n        startX = evt.type.includes('touch') ? evt.touches[0].clientX : evt.clientX;\n        handle.style.transition = 'none';\n    }\n\n    function onDrag(evt) {\n        if (!isDragging) return;\n        currentX = evt.type.includes('touch') ? evt.touches[0].clientX : evt.clientX;\n        var diffX = Math.min(Math.max(currentX - startX, 0), toggle.offsetWidth - handle.offsetWidth);\n        handle.style.transform = `translateX(${diffX}px)`;\n        toggle.style.opacity = 1 - diffX / (toggle.offsetWidth - handle.offsetWidth);\n    }\n\n    function endDrag() {\n        if (!isDragging) return;\n        isDragging = false;\n        handle.style.transition = 'transform 0.3s';\n        if (currentX - startX > toggle.offsetWidth / 2) {\n            handle.style.transform = `translateX(${toggle.offsetWidth - handle.offsetWidth}px)`;\n            playAnimation()\n            setTimeout(function () {\n                toggle.style.transition = 'opacity 0.3s';\n                toggle.style.opacity = '0';\n                setTimeout(function () {\n                    toggle.style.display = 'none';\n                    enableFlipCards();\n                }, 300);\n            }, 0);\n\n\n\n\n\n\n\n        } else {\n            handle.style.transform = 'translateX(0)';\n            toggle.style.opacity = '1';\n            label.textContent = 'swipe to unlock';\n        }\n    }\n\n\n\n\n});\n\n//# sourceURL=webpack://@finsweet/developer-starter/./src/perks.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/perks.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;