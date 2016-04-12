#Demos from //build 2016

The following 3 projects are the working demos that Anders showed during his talk.
They include all dependencies and are precompiled, so to get started all you need to do is download these folders and serve the apps.

An easy way to serve these are using the npm package `http-server`.
You can install `http-server` with:
```
> npm install -g http-server`
```
Upon running `http-server` from the root of a webapp folder, you will see something like:
```
> http-server
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:<PORT_NUMBER>     // <-- Navigate to this url to run!
```

##ng-reddit
This is a simple reddit client using Angular 2 that shows that display links to `http://reddit.com/r/aww`

Run by running `http-server` as mentioned above.

Build by running `tsc` from the project root. (Must have TypeScript installed globally)

##react-reddit
This is a simple reddit client using React that shows links and pictures to `http://reddit.com/r/aww`

Serve by running `http-server` as mentioned above.

Build by running `webpack` from the project root. (Must have Webpack installed globally)

##node-reddit
This a simple node/express server that will serve the react-reddit project in the neighboring folder.

Run with:
```
  > node built\server.js
```

Build by running`tsc` from the project root. (must have TypeScript installed globally)

##controlFlow-nonNull
This is a simple demo of the new control flow analysis and non-nullable types.
Note that is requires a build of TypeScript from the `controlFlowTypes` branch.
A pre-built version of this branch has been included in the `TypeScript-controlFlowTypes` folder.
If you would like to build it yourself, see our [GitHub README](http://github.com/microsoft/typescript). 

There is nothing to run in this project, the demo highlights the tooling in your editor.

Build by running `tsc` from the provided build with:
```
> node TypeScript-controlFlowTypes\tsc.js 
```

