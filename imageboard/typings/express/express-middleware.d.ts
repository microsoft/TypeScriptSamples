/// <reference path="express.d.ts" />

declare module "body-parser" {
    import express = require("express");
    function bodyParser(): express.RequestHandler;
    module bodyParser {
        function urlencoded(opts?: any): express.RequestHandler;
        function json(): express.RequestHandler;
    }
    export = bodyParser;
}

declare module "method-override" {
    import express = require("express");
    function methodOverride(): express.RequestHandler;
    export = methodOverride;
}

declare module "errorhandler" {
    import express = require("express");
    function errorHandler(opts?: any): express.ErrorRequestHandler;
    export = errorHandler;
}