import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: "src/app.ts", // 入口檔，可用你的主檔
  output: {
    file: "dist/app.user.js", // 輸出檔名（建議 .user.js 方便 Tampermonkey 安裝）
    format: "iife", // 立即執行函式，最適合 userscript
    sourcemap: true,
    banner: `// ==UserScript==
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
// ==/UserScript==`,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    // terser(), // 可選，加密/壓縮
  ],
};
