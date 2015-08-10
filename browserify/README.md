**Install Browserify**
```
npm install -g browserify
```

**Fetch dependencies**
```
npm install
```

**Compile .ts files**
```
node node_modules/typescript/bin/tsc.js
```
shortcut for this command
```
npm run tsc
```

**Run Browserify**
```
browserify src/app.js -o bundle.js -s app
```
shortcut for this command
```
npm run browserify

```

**Start http-server**
```
node node_modules/http-server/bin/http-server -o
```
shortcut for this command
```
npm run listen
```

By default http-server listens on port 8080. If this port is taken use '-p' to specify free port. 


**Shortcut for running all steps in a batch**
```
npm run all
```