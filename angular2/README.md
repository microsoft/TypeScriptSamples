**Fetch dependencies:**
```
npm install
```

**Build and run (combines 'build' and 'run server' commands using the default port 8080)**
```
npm start
```

**Build**
```
node node_modules/typescript/lib/tsc.js
```

**Run server**
```
node node_modules/http-server/bin/http-server -p 8080
```

'-p' sets the port to use, default port is 8080. If it is taken pick any port that is free. 
After server is started open 'localhost:8080' in a browser.