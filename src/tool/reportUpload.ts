import html2canvas from "html2canvas";
import { getButton } from "../utils/common";

/**
 * 將指定元素截圖並複製成圖片到剪貼簿。
 * @param elementId - 目標元素的 id
 * @returns 無傳回值，若有錯誤則丟出例外
 */
export const copyDivToClipboard = async (elementId: string): Promise<void> => {
    const element: HTMLElement | null = document.getElementById(elementId);
    if (!element) {
        throw new Error(`找不到元素: #${elementId}`);
    }

    // 使用 html2canvas 轉成 Canvas
    const canvas: HTMLCanvasElement = await html2canvas(element);
    // 將 Canvas 轉成 Blob
    return new Promise<void>((resolve, reject) => {
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

const addButton = () => {
  const btnUpload = getButton("複製");
  btnUpload.on('click', () => copyDivToClipboard('reportWrapper'));
  $('.titleInHeader').append(btnUpload);
};

addButton();
