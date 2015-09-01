System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "*": "src/*"
  },
  packages: {
    "/src": {
      "defaultExtension": "ts"
    }
  }
});
