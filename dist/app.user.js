// ==UserScript==
// @name         偷窺按鈕
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  偷窺按鈕!
// @author       Sky
// @include      *://*.travian.*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=travian.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/sky7519331/trToolButton/main/dist/app.user.js
// @downloadURL  https://raw.githubusercontent.com/sky7519331/trToolButton/main/dist/app.user.js
// ==/UserScript==
(function (exports) {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    // 設定規則：每個規則包含URL的RegExp與對應腳本檔案(可調整路徑)
    const scriptMappings = [
        { pattern: /\/profile/, scriptPath: './profile.ts' },
        { pattern: /\/report/, scriptPath: './reportUpload.ts' },
    ];
    /**
     * 根據目前 URL，自動載入對應腳本。
     * @param url - 目前網址（通常為 window.location.pathname）
     */
    const loadScriptByUrl = (url) => __awaiter(void 0, void 0, void 0, function* () {
        for (const mapping of scriptMappings) {
            if (mapping.pattern.test(url)) {
                try {
                    yield import(/* @vite-ignore */ mapping.scriptPath);
                    // 成功載入腳本後可於此執行其他初始化程式
                    break;
                }
                catch (error) {
                    console.error(`載入腳本失敗: ${mapping.scriptPath}`, error);
                }
            }
        }
    });
    // 實際使用：通常會以 window.location.pathname 當參數
    loadScriptByUrl(window.location.pathname);

    exports.loadScriptByUrl = loadScriptByUrl;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=app.user.js.map
