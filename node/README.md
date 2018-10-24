# TypeScript Sample: Node.js 
## Overview

This sample implements a very basic [node.js](https://nodejs.org/) application using TypeScript.

## Running
First of all, install all dependencies with:
```bash
npm install
```

Then, you can run each of the listed [examples](#examples) with the following command from the this project root folder:
```bash
ts-node ./examples/example-name.ts
```

To run the HTTPS server example, just:
```bash
ts-node ./examples/HttpServer.ts
```

This examples are running through [ts-node](https://github.com/TypeStrong/ts-node), which is not recommended in production environments. You can also build those examples with:
```bash
npm run build
```

And then running the compiled JavaScript (JS) example file with:
```bash
node ./dist/example-name.js
```

## Examples
* [TcpServer](./src/TcpServer.ts) - a simple TCP server
* [HttpServer](./src/HttpServer.ts) - a simple HTTPS server
* [API Client](./src/APIClient.ts) - client that sends a "ping"
* [API Server](./src/APIServer.ts) - server the receives that "ping" and responds with a "pong"
* [Word counter](./src/WordCounter.ts) - shows how many of the desired words are presented in a file
* [Wikipedia Search](./src/Wikipedia.ts) - searches the [Wikipedia](https://en.wikipedia.org/w/api.php?) website

**note**: due to HTTP/HTTPS distinct way of handle localhost requests, in the examples HTTP is used instead of HTTPS because is a more easy way to set it up.

## Standards
A modified version of the [Microsoft Linter Standards](https://github.com/Microsoft/tslint-microsoft-contrib) is used. Please be mindful that they are here to help you out improve you code.

## Git Hooks
Due to [Husky](https://github.com/typicode/husky) integration, before any push to this Github repository, [TSLint](https://github.com/palantir/tslint) will run and then point out all the fixes that needs to be done to follow the set of code [standards](#standards); if nothing needs to be corrected, you then can push it :)
