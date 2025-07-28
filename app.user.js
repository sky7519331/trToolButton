// ==UserScript==
// @name         LSN attack timer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include        *://*.travian.*/build.php*gid=16*tt=2*
// @exclude     *.css
// @exclude     *.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=edu.tw
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