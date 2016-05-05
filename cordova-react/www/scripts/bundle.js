/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __assign = (this && this.__assign) || Object.assign || function(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	            t[p] = s[p];
	    }
	    return t;
	};
	var $ = __webpack_require__(1);
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var RedditSubmission_1 = __webpack_require__(4);
	function displaySubreddit(subreddit) {
	    var settings = {
	        url: "https://www.reddit.com/r/" + subreddit + ".json"
	    };
	    $.ajax(settings).done(function (response) {
	        var submissions = response.data.children;
	        // TODO: filter on images
	        submissions = submissions.filter(function (_a) {
	            var data = _a.data;
	            return /(png|jpg)$/.test(data.url);
	        });
	        var components = submissions.map(function (value, index) {
	            return React.createElement(RedditSubmission_1.SubmissionComp, __assign({key: index, elementPosition: index}, value.data));
	        });
	        ReactDOM.render(React.createElement("div", null, components), document.getElementById("content"));
	    });
	}
	displaySubreddit("aww");


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(2);
	var imageStyle = {
	    maxWidth: "600px",
	    maxHeight: "600px",
	};
	exports.SubmissionComp = function (submission) {
	    return React.createElement("div", {style: { fontFamily: "sans-serif" }}, submission.elementPosition ? React.createElement("br", null) : "", React.createElement("span", {style: { fontSize: "1.2rem" }}, React.createElement("span", null, submission.elementPosition + 1, "."), React.createElement("a", {href: submission.url}, submission.title)), React.createElement("span", null, " (", submission.domain, ") "), React.createElement("div", null, "Submitted at ", new Date(submission.created_utc).toLocaleTimeString(), "."), React.createElement("img", {src: submission.url, style: imageStyle}));
	};


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map