/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./engine.js":
/*!*******************!*\
  !*** ./engine.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "engine": () => (/* binding */ engine)
/* harmony export */ });
// Simple JavaScript Templating
// John Resig - https://johnresig.com/ - MIT Licensed
const cache = {};

const engine = (str, data) => {
  // Figure out if we're getting a template, or if we need to
  // load the template - and be sure to cache the result.
  const fn = !/\W/.test(str)
    ? (cache[str] =
        cache[str] || engine(document.getElementById(str).innerHTML))
    : // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function(
        "obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
          // Introduce the data as local variables using with(){}
          "with(obj){p.push('" +
          // Convert the template into pure JavaScript
          str
            .replace(/[\r\t\n]/g, " ")
            .split("<%")
            .join("\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t")
            .join("');")
            .split("%>")
            .join("p.push('")
            .split("\r")
            .join("\\'") +
          "');}return p.join('');"
      );

  // Provide some basic currying to the user
  return data ? fn(data) : fn;
};


/***/ }),

/***/ "./src/style/main.css":
/*!****************************!*\
  !*** ./src/style/main.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./router.js":
/*!*******************!*\
  !*** ./router.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "route": () => (/* binding */ route)
/* harmony export */ });
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine */ "./engine.js");
// JavaScript router in 20 lines
// Joakim Carlstein - https://joakim.beng.se/

let el = null;
let events = [];
const routes = {};

const route = (path, templateId, controller) => {
  const listeners = [];
  controller.prototype.$on = (selector, evt, handler) =>
    events.push([selector, evt, handler]);
  controller.prototype.$refresh = () => listeners.forEach((fn) => fn());
  routes[path] = {
    templateId: templateId,
    controller: controller,
    onRefresh: listeners.push.bind(listeners),
  };
};

const forEachEvent = (fnName) => {
  for (let i = 0; i < events.length; i++) {
    const els = el.querySelectorAll(events[i][0]);
    for (let j = 0; j < els.length; j++) {
      els[j][fnName].apply(els[j], events[i].slice(1));
    }
  }
};

const router = async () => {
  // Lazy load view element:
  el = el || document.getElementById("app");
  // Remove current event listeners:
  forEachEvent("removeEventListener");
  // Clear events, to prepare for next render:
  events = [];
  // Current route url (getting rid of '#' in hash as well):
  const url = location.hash.slice(1) || "/";
  // Get route by url or fallback if it does not exist:

  const template = await fetch(`./src/templates/${url}.html`);

  console.log(template);

  const route = routes[url] || routes["*"];
  if (route && route.controller) {
    const ctrl = new route.controller();
    // Listen on route refreshes:
    route.onRefresh(() => {
      forEachEvent("removeEventListener");
      // Render route template with John Resig's template engine:
      el.innerHTML = (0,_engine__WEBPACK_IMPORTED_MODULE_0__.engine)(route.templateId, ctrl);
      forEachEvent("addEventListener");
    });
    // Trigger the first refresh:
    ctrl.$refresh();
  }
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../router */ "./router.js");
/* harmony import */ var _style_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style/main.css */ "./src/style/main.css");



(0,_router__WEBPACK_IMPORTED_MODULE_0__.route)("/", "home", function () {
  this.where = "here";
});

(0,_router__WEBPACK_IMPORTED_MODULE_0__.route)("/ex1", "example1", function () {
  this.title = "Example 1";
});

(0,_router__WEBPACK_IMPORTED_MODULE_0__.route)("/ex2", "example2", function () {
  this.title = "Example 2";
  this.counter = 0;
  this.$on(".my-button", "click", () => {
    this.counter += 1;
    this.$refresh();
  });
});

(0,_router__WEBPACK_IMPORTED_MODULE_0__.route)("*", "404", function () {});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly96YWRhbmllLy4vZW5naW5lLmpzIiwid2VicGFjazovL3phZGFuaWUvLi9zcmMvc3R5bGUvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vemFkYW5pZS8uL3JvdXRlci5qcyIsIndlYnBhY2s6Ly96YWRhbmllL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3phZGFuaWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3phZGFuaWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly96YWRhbmllL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vemFkYW5pZS8uL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsNEJBQTRCO0FBQy9EO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGtCQUFrQjtBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25DQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDa0M7QUFDbEM7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrREFBa0QsSUFBSTs7QUFFdEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsK0NBQU07QUFDM0I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztVQzNEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNOa0M7QUFDUjs7QUFFMUIsOENBQUs7QUFDTDtBQUNBLENBQUM7O0FBRUQsOENBQUs7QUFDTDtBQUNBLENBQUM7O0FBRUQsOENBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQsOENBQUssMkJBQTJCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTaW1wbGUgSmF2YVNjcmlwdCBUZW1wbGF0aW5nXG4vLyBKb2huIFJlc2lnIC0gaHR0cHM6Ly9qb2hucmVzaWcuY29tLyAtIE1JVCBMaWNlbnNlZFxuY29uc3QgY2FjaGUgPSB7fTtcblxuZXhwb3J0IGNvbnN0IGVuZ2luZSA9IChzdHIsIGRhdGEpID0+IHtcbiAgLy8gRmlndXJlIG91dCBpZiB3ZSdyZSBnZXR0aW5nIGEgdGVtcGxhdGUsIG9yIGlmIHdlIG5lZWQgdG9cbiAgLy8gbG9hZCB0aGUgdGVtcGxhdGUgLSBhbmQgYmUgc3VyZSB0byBjYWNoZSB0aGUgcmVzdWx0LlxuICBjb25zdCBmbiA9ICEvXFxXLy50ZXN0KHN0cilcbiAgICA/IChjYWNoZVtzdHJdID1cbiAgICAgICAgY2FjaGVbc3RyXSB8fCBlbmdpbmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3RyKS5pbm5lckhUTUwpKVxuICAgIDogLy8gR2VuZXJhdGUgYSByZXVzYWJsZSBmdW5jdGlvbiB0aGF0IHdpbGwgc2VydmUgYXMgYSB0ZW1wbGF0ZVxuICAgICAgLy8gZ2VuZXJhdG9yIChhbmQgd2hpY2ggd2lsbCBiZSBjYWNoZWQpLlxuICAgICAgbmV3IEZ1bmN0aW9uKFxuICAgICAgICBcIm9ialwiLFxuICAgICAgICBcInZhciBwPVtdLHByaW50PWZ1bmN0aW9uKCl7cC5wdXNoLmFwcGx5KHAsYXJndW1lbnRzKTt9O1wiICtcbiAgICAgICAgICAvLyBJbnRyb2R1Y2UgdGhlIGRhdGEgYXMgbG9jYWwgdmFyaWFibGVzIHVzaW5nIHdpdGgoKXt9XG4gICAgICAgICAgXCJ3aXRoKG9iail7cC5wdXNoKCdcIiArXG4gICAgICAgICAgLy8gQ29udmVydCB0aGUgdGVtcGxhdGUgaW50byBwdXJlIEphdmFTY3JpcHRcbiAgICAgICAgICBzdHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9bXFxyXFx0XFxuXS9nLCBcIiBcIilcbiAgICAgICAgICAgIC5zcGxpdChcIjwlXCIpXG4gICAgICAgICAgICAuam9pbihcIlxcdFwiKVxuICAgICAgICAgICAgLnJlcGxhY2UoLygoXnwlPilbXlxcdF0qKScvZywgXCIkMVxcclwiKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcdD0oLio/KSU+L2csIFwiJywkMSwnXCIpXG4gICAgICAgICAgICAuc3BsaXQoXCJcXHRcIilcbiAgICAgICAgICAgIC5qb2luKFwiJyk7XCIpXG4gICAgICAgICAgICAuc3BsaXQoXCIlPlwiKVxuICAgICAgICAgICAgLmpvaW4oXCJwLnB1c2goJ1wiKVxuICAgICAgICAgICAgLnNwbGl0KFwiXFxyXCIpXG4gICAgICAgICAgICAuam9pbihcIlxcXFwnXCIpICtcbiAgICAgICAgICBcIicpO31yZXR1cm4gcC5qb2luKCcnKTtcIlxuICAgICAgKTtcblxuICAvLyBQcm92aWRlIHNvbWUgYmFzaWMgY3VycnlpbmcgdG8gdGhlIHVzZXJcbiAgcmV0dXJuIGRhdGEgPyBmbihkYXRhKSA6IGZuO1xufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIEphdmFTY3JpcHQgcm91dGVyIGluIDIwIGxpbmVzXG4vLyBKb2FraW0gQ2FybHN0ZWluIC0gaHR0cHM6Ly9qb2FraW0uYmVuZy5zZS9cbmltcG9ydCB7IGVuZ2luZSB9IGZyb20gXCIuL2VuZ2luZVwiO1xubGV0IGVsID0gbnVsbDtcbmxldCBldmVudHMgPSBbXTtcbmNvbnN0IHJvdXRlcyA9IHt9O1xuXG5leHBvcnQgY29uc3Qgcm91dGUgPSAocGF0aCwgdGVtcGxhdGVJZCwgY29udHJvbGxlcikgPT4ge1xuICBjb25zdCBsaXN0ZW5lcnMgPSBbXTtcbiAgY29udHJvbGxlci5wcm90b3R5cGUuJG9uID0gKHNlbGVjdG9yLCBldnQsIGhhbmRsZXIpID0+XG4gICAgZXZlbnRzLnB1c2goW3NlbGVjdG9yLCBldnQsIGhhbmRsZXJdKTtcbiAgY29udHJvbGxlci5wcm90b3R5cGUuJHJlZnJlc2ggPSAoKSA9PiBsaXN0ZW5lcnMuZm9yRWFjaCgoZm4pID0+IGZuKCkpO1xuICByb3V0ZXNbcGF0aF0gPSB7XG4gICAgdGVtcGxhdGVJZDogdGVtcGxhdGVJZCxcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyLFxuICAgIG9uUmVmcmVzaDogbGlzdGVuZXJzLnB1c2guYmluZChsaXN0ZW5lcnMpLFxuICB9O1xufTtcblxuY29uc3QgZm9yRWFjaEV2ZW50ID0gKGZuTmFtZSkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGVscyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoZXZlbnRzW2ldWzBdKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGVscy5sZW5ndGg7IGorKykge1xuICAgICAgZWxzW2pdW2ZuTmFtZV0uYXBwbHkoZWxzW2pdLCBldmVudHNbaV0uc2xpY2UoMSkpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3Qgcm91dGVyID0gYXN5bmMgKCkgPT4ge1xuICAvLyBMYXp5IGxvYWQgdmlldyBlbGVtZW50OlxuICBlbCA9IGVsIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpO1xuICAvLyBSZW1vdmUgY3VycmVudCBldmVudCBsaXN0ZW5lcnM6XG4gIGZvckVhY2hFdmVudChcInJlbW92ZUV2ZW50TGlzdGVuZXJcIik7XG4gIC8vIENsZWFyIGV2ZW50cywgdG8gcHJlcGFyZSBmb3IgbmV4dCByZW5kZXI6XG4gIGV2ZW50cyA9IFtdO1xuICAvLyBDdXJyZW50IHJvdXRlIHVybCAoZ2V0dGluZyByaWQgb2YgJyMnIGluIGhhc2ggYXMgd2VsbCk6XG4gIGNvbnN0IHVybCA9IGxvY2F0aW9uLmhhc2guc2xpY2UoMSkgfHwgXCIvXCI7XG4gIC8vIEdldCByb3V0ZSBieSB1cmwgb3IgZmFsbGJhY2sgaWYgaXQgZG9lcyBub3QgZXhpc3Q6XG5cbiAgY29uc3QgdGVtcGxhdGUgPSBhd2FpdCBmZXRjaChgLi9zcmMvdGVtcGxhdGVzLyR7dXJsfS5odG1sYCk7XG5cbiAgY29uc29sZS5sb2codGVtcGxhdGUpO1xuXG4gIGNvbnN0IHJvdXRlID0gcm91dGVzW3VybF0gfHwgcm91dGVzW1wiKlwiXTtcbiAgaWYgKHJvdXRlICYmIHJvdXRlLmNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBjdHJsID0gbmV3IHJvdXRlLmNvbnRyb2xsZXIoKTtcbiAgICAvLyBMaXN0ZW4gb24gcm91dGUgcmVmcmVzaGVzOlxuICAgIHJvdXRlLm9uUmVmcmVzaCgoKSA9PiB7XG4gICAgICBmb3JFYWNoRXZlbnQoXCJyZW1vdmVFdmVudExpc3RlbmVyXCIpO1xuICAgICAgLy8gUmVuZGVyIHJvdXRlIHRlbXBsYXRlIHdpdGggSm9obiBSZXNpZydzIHRlbXBsYXRlIGVuZ2luZTpcbiAgICAgIGVsLmlubmVySFRNTCA9IGVuZ2luZShyb3V0ZS50ZW1wbGF0ZUlkLCBjdHJsKTtcbiAgICAgIGZvckVhY2hFdmVudChcImFkZEV2ZW50TGlzdGVuZXJcIik7XG4gICAgfSk7XG4gICAgLy8gVHJpZ2dlciB0aGUgZmlyc3QgcmVmcmVzaDpcbiAgICBjdHJsLiRyZWZyZXNoKCk7XG4gIH1cbn07XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCByb3V0ZXIpO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHJvdXRlcik7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJvdXRlIH0gZnJvbSBcIi4uL3JvdXRlclwiO1xuaW1wb3J0IFwiLi9zdHlsZS9tYWluLmNzc1wiO1xuXG5yb3V0ZShcIi9cIiwgXCJob21lXCIsIGZ1bmN0aW9uICgpIHtcbiAgdGhpcy53aGVyZSA9IFwiaGVyZVwiO1xufSk7XG5cbnJvdXRlKFwiL2V4MVwiLCBcImV4YW1wbGUxXCIsIGZ1bmN0aW9uICgpIHtcbiAgdGhpcy50aXRsZSA9IFwiRXhhbXBsZSAxXCI7XG59KTtcblxucm91dGUoXCIvZXgyXCIsIFwiZXhhbXBsZTJcIiwgZnVuY3Rpb24gKCkge1xuICB0aGlzLnRpdGxlID0gXCJFeGFtcGxlIDJcIjtcbiAgdGhpcy5jb3VudGVyID0gMDtcbiAgdGhpcy4kb24oXCIubXktYnV0dG9uXCIsIFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHRoaXMuY291bnRlciArPSAxO1xuICAgIHRoaXMuJHJlZnJlc2goKTtcbiAgfSk7XG59KTtcblxucm91dGUoXCIqXCIsIFwiNDA0XCIsIGZ1bmN0aW9uICgpIHt9KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=