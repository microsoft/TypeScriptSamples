**Fetch dependencies:**
```
npm install
```

**Build and run sample in browser (using port 8080)**
```
npm run browser
```

**Build and run sample using NodeJS**
```
npm run node
```

**Run http-server on custom port (for browser version)**
```
node node_modules/http-server/bin/http-server -p 8080 -o
```

'-p' sets the port to use, default port is 8080. If it is taken pick any port that is free. 
After server is started open 'localhost:8080' in a browser.