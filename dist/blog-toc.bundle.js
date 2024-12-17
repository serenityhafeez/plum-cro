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

/***/ "./src/blog-toc.js":
/*!*************************!*\
  !*** ./src/blog-toc.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    var currentURL = window.location.href;\n    var pageTitle = document.title;\n\n    // LinkedIn\n    var linkedinShare = document.getElementById(\"linkedin-share\");\n    if (linkedinShare) {\n        linkedinShare.href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentURL)}&summary=${encodeURIComponent(pageTitle)}`;\n        linkedinShare.target = \"_blank\";  // Open in a new tab\n    }\n\n    // X (Twitter)\n    var twitterShare = document.getElementById(\"twitter-share\");\n    if (twitterShare) {\n        twitterShare.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}&text=${encodeURIComponent(pageTitle)}`;\n        twitterShare.target = \"_blank\";  // Open in a new tab\n    }\n\n    // WhatsApp\n    var whatsappShare = document.getElementById(\"whatsapp-share\");\n    if (whatsappShare) {\n        whatsappShare.href = `https://wa.me/?text=${encodeURIComponent(pageTitle + \"\\n\" + currentURL)}`;\n        whatsappShare.target = \"_blank\";  // Open in a new tab\n    }\n\n\n});\n\n\n\n//# sourceURL=webpack://@finsweet/developer-starter/./src/blog-toc.js?");

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
/******/ 	__webpack_modules__["./src/blog-toc.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;