SystemJS.config({
  baseURL: "/",
  paths: {
    "*": "src/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*",
    "src": "src",
  }
});
