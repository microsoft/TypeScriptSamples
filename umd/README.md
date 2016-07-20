**Fetch dependencies:**
```
npm install
```

**Compile TypeScript source code**

```
node node_modules/typescript/bin/tsc.js
```

**Start browser version of the sample using http-server on custom port (code should be compiled prior to this step)**
```
node node_modules/http-server/bin/http-server -p 8080 -o
```
'-p' sets the port to use, default port is 8080. If it is taken pick any port that is free. 
After server is started open 'localhost:8080' in a browser.


**Run example using Node (code should be compiled prior to this step)**

```
node node/app.js
```

Shortcuts for doing compile\run steps from above:

*Browser*
```
npm run browser
```

*Node*
```
npm run node
```