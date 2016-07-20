SystemJS.config({
  transpiler: "plugin-typescript",
  packages: {
    "app": {
      "main": "app.ts",
      "defaultExtension": "ts"
    }
  },
  browserConfig: {
    baseURL: "/",
    paths: {
      "app/": "src/",
      "github:": "jspm_packages/github/",
      "npm:": "jspm_packages/npm/"
    }
  },
  devConfig: {
    "map": {
      "plugin-typescript": "github:frankwallis/plugin-typescript@4.0.6",
      "os": "github:jspm/nodelibs-os@0.2.0-alpha"
    },
    "packages": {
      "github:frankwallis/plugin-typescript@4.0.6": {
        "map": {
          "typescript": "npm:typescript@1.8.10"
        }
      },
      "github:jspm/nodelibs-os@0.2.0-alpha": {
        "map": {
          "os-browserify": "npm:os-browserify@0.2.1"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "core-js": "npm:core-js@2.4.0",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha"
  },
  packages: {}
});
