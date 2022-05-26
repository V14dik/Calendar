export const route = async (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  await handleLocation();
};

const routesHtml = {
  "/": "month-table.html",
  "/week": "week-table.html",
  "/year": "year-table.html",
  "/add-new": "add-new.html",
  "/sign-up": "sign-up.html",
  "/sign-in": "sign-in.html",
  "/add-theme": "add-theme.html",
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routesHtml[path];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("calendar-container").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;
