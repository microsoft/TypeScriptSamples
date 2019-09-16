(function () {
    // Append the bind() polyfill
    var scriptElem = document.createElement('script');
    scriptElem.setAttribute('src', 'scripts/android2.3-jscompat.js');
    if (document.body) {
        document.body.appendChild(scriptElem);
    } else {
        document.head.appendChild(scriptElem);
    }
}());