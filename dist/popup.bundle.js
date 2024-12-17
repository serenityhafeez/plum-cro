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

/***/ "./src/popup.js":
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nconst CookieService = {\n\n  setCookie(name, value, days) {\n    let expires = '';\n    if (days) {\n      const date = new Date();\n      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);\n      expires = '; expires=' + date.toUTCString();\n      // console.log(`Set cookie: ${name}=${value}; expires=${date.toUTCString()}`);\n    } else {\n      // console.log(`Set cookie: ${name}=${value}; no expiration`);\n    }\n    document.cookie = name + '=' + (value || '') + expires + '; path=/';\n  },\n\n  getCookie(name) {\n    const nameEQ = name + \"=\";\n    const ca = document.cookie.split(';');\n    for (let i = 0; i < ca.length; i++) {\n      let c = ca[i];\n      while (c.charAt(0) === ' ') c = c.substring(1, c.length);\n      if (c.indexOf(nameEQ) === 0) {\n        // console.log(`Get cookie: ${name}=${c.substring(nameEQ.length, c.length)}`);\n        return c.substring(nameEQ.length, c.length);\n      }\n    }\n    // console.log(`Cookie ${name} not found`);\n    return null;\n  }\n};\n\nconst hidePopup = () => {\n  document.querySelector('.exit-intent-popup-desktop').classList.remove('visible');\n  // console.log('Popup hidden');\n};\n\n\n//Simply popup closed\nconst exit = (e) => {\n  if (e.target.className === 'close') {\n    hidePopup();\n    CookieService.setCookie('exitIntentClosed', true, 2); // Set cookie for 2 days\n    // console.log('Exit event triggered');\n  }\n};\n\n//exit intent mouse above document\nconst mouseEvent = (e) => {\n  const shouldShowExitIntent = !e.toElement && !e.relatedTarget && e.clientY < 10;\n  // console.log(`Mouse event detected, should show exit intent: ${shouldShowExitIntent}`);\n  if (shouldShowExitIntent && !CookieService.getCookie('exitIntentClosed') && !CookieService.getCookie('formSubmitted')) {\n    document.removeEventListener('mouseout', mouseEvent);\n    document.querySelector('.exit-intent-popup-desktop').classList.add('visible');\n    CookieService.setCookie('exitIntentShown', true, 2); // Set cookie for 2 days\n    // console.log('Exit intent popup shown');\n  }\n};\n\n//\nconst scrollEvent = () => {\n  const scrollPosition = window.scrollY || document.documentElement.scrollTop;\n  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;\n  const scrollPercent = (scrollPosition / scrollHeight) * 100;\n  // console.log(`Scroll event detected, scroll percent: ${scrollPercent}%`);\n  if (scrollPercent > 15 && !CookieService.getCookie('exitIntentClosed') && !CookieService.getCookie('formSubmitted')) {\n    document.removeEventListener('scroll', scrollEvent);\n    document.querySelector('.exit-intent-popup-desktop').classList.add('visible');\n    CookieService.setCookie('exitIntentShown', true, 2); // Set cookie for 2 days\n    // console.log('Exit intent popup shown due to scroll');\n  }\n};\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  // console.log('DOMContentLoaded event');\n  if (!CookieService.getCookie('exitIntentClosed') && !CookieService.getCookie('formSubmitted')) {\n    setTimeout(() => {\n      if (window.innerWidth > 768) { // Desktop\n        document.addEventListener('mouseout', mouseEvent);\n        document.addEventListener('click', exit);\n        // console.log('Mouseout and click event listeners added for desktop');\n      } else { // Mobile and Tablet\n        document.addEventListener('scroll', scrollEvent);\n        // console.log('Scroll event listener added for mobile/tablet');\n      }\n    }, 2000);\n\n    // Show popup after 10 seconds if not already shown\n    setTimeout(() => {\n      if (!CookieService.getCookie('exitIntentShown') && window.innerWidth > 768) {\n        const popup = document.querySelector('.exit-intent-popup-desktop');\n        if (popup) {\n          popup.classList.add('visible');\n          // console.log('Popup shown after 10 seconds on desktop');\n        } else {\n          // console.log('Popup not found after 10 seconds');\n        }\n      }\n    }, 30000);\n  }\n\n  // Get all forms with the custom attribute\n  const forms = document.querySelectorAll('[data-form-id]');\n  // console.log('Number of forms found:', forms.length);\n\n  // Iterate over each form\n  forms.forEach(form => {\n    const formId = form.getAttribute('data-form-id');\n    // console.log('Checking form with ID:', formId);\n\n    // Check if the form has been submitted before\n    if (CookieService.getCookie(`formSubmitted_${formId}`)) {\n      hidePopup(); // Hide the popup if the form has been submitted before\n    } else {\n      form.addEventListener('submit', (e) => {\n        // e.preventDefault(); // Prevent the default form submission behavior\n\n        // setTimeout(() => {\n        //   hidePopup();\n        // }, 2000);\n\n        // Set a cookie to indicate that the form has been submitted\n        CookieService.setCookie(`formSubmitted_${formId}`, true, 365);\n\n        // console.log(`Form ${formId} submitted, popup hidden`);\n      });\n    }\n  });\n\n\n\n\n  // Close button handler\n  document.querySelectorAll('.modal-continue-button, .close').forEach(button => {\n    button.addEventListener('click', () => {\n      hidePopup();\n      CookieService.setCookie('exitIntentClosed', true, 2); // Set cookie for 2 days\n      // console.log('Popup closed via button');\n    });\n  });\n\n\n\n});\n\n\n\n\n\n\n\n//# sourceURL=webpack://@finsweet/developer-starter/./src/popup.js?");

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
/******/ 	__webpack_modules__["./src/popup.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;