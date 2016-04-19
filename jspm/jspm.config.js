SystemJS.config({
  transpiler: "plugin-typescript",
  packages: {
    "src": {
      "defaultExtension": "ts",
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
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "core-js": "npm:core-js@0.9.18",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "plugin-typescript": "github:frankwallis/plugin-typescript@4.0.6",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "readline": "github:jspm/nodelibs-readline@0.2.0-alpha",
    "typescript": "npm:typescript@1.5.3"
  },
  packages: {
    "github:frankwallis/plugin-typescript@4.0.6": {
      "map": {
        "typescript": "npm:typescript@1.8.10"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.5.1"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "npm:buffer@4.5.1": {
      "map": {
        "base64-js": "npm:base64-js@1.1.2",
        "ieee754": "npm:ieee754@1.1.6",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:core-js@0.9.18": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.0"
      }
    },
    "npm:typescript@1.5.3": {
      "map": {}
    }
  }
});
