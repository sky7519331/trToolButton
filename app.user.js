// ==UserScript==
// @name         偷窺按鈕
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      *://*.travian.*/profile/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=travian.com
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    function scriptReady(callback) {
        const script = document.createElement("script");
        script.textContent = "jQuery(document).ready(" + callback.toString() + ");";
        document.body.appendChild(script);
    }
    function main() {
        const customScriptUrl = 'https://sky7519331.github.io/trToolButton/dist/app.js';
        const customScriptJSElement = document.createElement('script');
        customScriptJSElement.setAttribute('type', 'text/javascript');
        customScriptJSElement.setAttribute('src', customScriptUrl);
        document.getElementsByTagName("body")[0].appendChild(customScriptJSElement);
    }

    scriptReady(main);

})();