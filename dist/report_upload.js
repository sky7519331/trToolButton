const customScriptJSElement = document.createElement('script');
customScriptJSElement.setAttribute('type', 'text/javascript');
customScriptJSElement.setAttribute('src', 'http://html2canvas.hertzen.com/dist/html2canvas.min.js');

const button = document.createElement("button");
button.innerHTML = "複製報告";
button.style.position = 'absolute';
button.style.top = "10px";
button.style.left = "10px";
button.style.width = 300;
button.style.height = 300;
button.style.padding = '10px';
button.style.background = '#f0f0f0';
button.style.display = 'block';
button.style.zIndex = 99;

// 2. Append somewhere
var body = document.getElementsByClassName("reportWrapper")[0];
body.appendChild(button);

button.addEventListener("click", () => copyDivToClipboard('reportWrapper'));

/**
 * 將指定元素截圖並複製成圖片到剪貼簿。
 * @param elementId - 目標元素的 id
 * @returns 無傳回值，若有錯誤則丟出例外
 */
export const copyDivToClipboard = async (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error(`找不到元素: #${elementId}`);
    }

    // 使用 html2canvas 轉成 Canvas
    const canvas = await html2canvas(element);
    // 將 Canvas 轉成 Blob
    return new Promise((resolve, reject) => {
        canvas.toBlob(async (blob) => {
            if (!blob) {
                reject(new Error('轉換圖片失敗'));
                return;
            }
            try {
                // 建立 ClipboardItem 實例
                const item = new ClipboardItem({ 'image/png': blob });
                // 複製到剪貼簿
                await navigator.clipboard.write([item]);
                resolve();
            } catch (err) {
                reject(err);
            }
        }, 'image/png');
    });
};
