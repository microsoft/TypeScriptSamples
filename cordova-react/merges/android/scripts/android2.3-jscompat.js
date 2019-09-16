// Polyfill for Function.prototype.bind() support on Android 2.3
(function () {
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (thisValue) {
            if (typeof this !== "function") {
                throw new TypeError(this + " cannot be bound as it is not a function");
            }

            // bind() also permits prepending arguments to the call
            var preArgs = Array.prototype.slice.call(arguments, 1);

            // The actual function to bind the "this" value and arguments to
            var functionToBind = this;
            var noOpFunction = function () { };

            // The "this" argument to use
            var thisArg = this instanceof noOpFunction && thisValue ? this : thisValue;

            // The resulting bound function
            var boundFunction = function () {
                return functionToBind.apply(thisArg, preArgs.concat(Array.prototype.slice.call(arguments)));
            };

            noOpFunction.prototype = this.prototype;
            boundFunction.prototype = new noOpFunction();

            return boundFunction;
        };
    }
}());
