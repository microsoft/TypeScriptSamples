# TypeScript Sample: Image Board 

## Overview 

This sample implements a complete Node.js application.
Notable features:

* Typed usage of express for server side MVC
* Typed usage of mongodb for server side database
* Typed usage of Node.js
* Use of external typings from DefinitelyTyped
* Visual Studio project file for working with the project

## Running 

Note: All commands entered need to be performed from within *this directory*.

1. Install MongoDB if necessary (see http://docs.mongodb.org/manual/installation/ )

2. Ensure you have a clean directory to dedicate as to a database (e.g. `C:\imageboard` or `~/imageboard/`). 

3. From *this repository's imageboard directory*, run the following command to launch the MongoDB process.
    ```shell
    <MONGO_INSTALL_DIRECTORY>/bin/mongod --dbpath <PATH_TO_DB_DIRECTORY>
    ```

4. From *this repository's imageboard directory*, restore the sample app data to MongoDB in another command prompt with the following command:
    ```shell
    <MONGO_INSTALL_DIRECTORY>/bin/mongorestore dump
    ```

5. From this imageboard directory, install the app's node dependencies, tsd, and typings with the following commands:
    ```shell
    npm install
    npm install -g tsd
    tsd install
    ```
    Some things to note:

    * `npm install` will install this project's node dependencies from `package.json`.
    * `tsd install` will retrieve `.d.ts` files from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

6. Compile the app with the following command:
    ```shell
    tsc
    ```
    The above command will use `tsconfig.json` to compile all necessary files.

7. Launch the Node process to serve the app using the following command:
    ```shell
    node app.js
    ```

7. Open your favorite browser and navigating to `http://localhost:3000/` to access the app.
