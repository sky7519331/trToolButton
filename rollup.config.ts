import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/app.ts',      // 入口檔，可用你的主檔
  output: {
    file: 'dist/app.user.js',  // 輸出檔名（建議 .user.js 方便 Tampermonkey 安裝）
    format: 'iife',            // 立即執行函式，最適合 userscript
    banner: `
// ==UserScript==
// @name         偷窺按鈕
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  偷窺按鈕!
// @author       Sky
// @include      *://*.travian.*/profile/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=travian.com
// @grant        none
// ==/UserScript==`
  },
  plugins: [
    typescript(),
    terser() // 可選，加密/壓縮
  ]
};
