// JavaScript router in 20 lines
// Joakim Carlstein - https://joakim.beng.se/
import { engine } from "./engine";
let el = null;
let events = [];
const routes = {};

export const route = (path, controller) => {
  const listeners = [];
  controller.prototype.$on = (selector, evt, handler) =>
    events.push([selector, evt, handler]);
  controller.prototype.$refresh = () => listeners.forEach((fn) => fn());
  routes[path] = {
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
  const parser = new DOMParser();
  let templateId;
  let templateHtml;
  let show404page = false;
  // Lazy load view element:
  el = el || document.getElementById("app");
  // Remove current event listeners:
  forEachEvent("removeEventListener");
  // Clear events, to prepare for next render:
  events = [];
  // Current route url (getting rid of '#' in hash as well):
  const url = location.hash.slice(1) || "/";
  // map url to fit fetch pattern
  const urlParam = url === "/" ? "home" : url.replace("/", "");
  // fetch template
  const template = await fetch(`./src/templates/${urlParam}.html`);

  // add template to index if not added yet and set templeteID
  if (template.ok) {
    const templateText = await template.text();
    templateHtml = parser
      .parseFromString(templateText, "text/html")
      .querySelector("script");
    if (template.id) {
      templateId = templateHtml.id;
    } else {
      templateHtml.id = urlParam;
      templateId = urlParam;
    }
  } else {
    // show 404 if template not found
    show404page = true;
    const notfoundpage = await (await fetch(`./src/templates/404.html`)).text();
    templateHtml = parser
      .parseFromString(notfoundpage, "text/html")
      .querySelector("script");
    templateId = "404";
  }
  if (!document.getElementById(templateId)) {
    document.head.appendChild(templateHtml);
  }
  // Get route by url or fallback if it does not exist:
  const route = show404page ? routes["*"] : routes[url];
  if (route && route.controller) {
    const ctrl = new route.controller();
    // Listen on route refreshes:
    route.onRefresh(() => {
      forEachEvent("removeEventListener");
      // Render route template with John Resig's template engine:
      el.innerHTML = engine(templateId ?? "404", ctrl);
      forEachEvent("addEventListener");
    });
    // Trigger the first refresh:
    ctrl.$refresh();
  }
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
