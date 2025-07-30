import html2canvas from "html2canvas";
import { getButton } from "../utils/common";

/**
 * 將指定元素的 innerHTML（含 <img> 幫你轉成 base64 inline），複製到剪貼簿 (text/html)
 * 需 https / localhost 下運作，且 clipboard API 必須獲得授權
 */
export const copyDivToClipboard = async (elementId: string): Promise<void> => {
    const element: HTMLElement | null = document.getElementById(elementId);
    if (!element) {
        throw new Error(`找不到元素 #${elementId}`);
    }
    // 複製一份 DOM
    const clonedNode = element.cloneNode(true) as HTMLElement;
    const imgNodes = Array.from(clonedNode.querySelectorAll('img'));

    // 將 <img> src 轉為 base64
    await Promise.all(
        imgNodes.map(async (img) => {
            // 略過已為 data: 的圖片
            if (!img.src.startsWith('data:')) {
                try {
                    const res = await fetch(img.src);
                    const blob = await res.blob();
                    const reader = new FileReader();
                    const dataUrl = await new Promise<string>((resolve, reject) => {
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
                    img.src = dataUrl;
                } catch (e) {
                    // 失敗則用原本 img src，不拋錯
                }
            }
        }),
    );

    // 製作 html
    const html = clonedNode.outerHTML;
    // 寫入剪貼簿
    try {
        await navigator.clipboard.write([
            new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }) }),
        ]);
    } catch (err) {
        throw new Error('寫入剪貼簿失敗，請確認有權限且是在安全環境（https）下。');
    }
};

export const addButton = () => {
  const btnUpload = getButton("複製");
  btnUpload.on('click', () => copyDivToClipboard('reportWrapper'));
  $('#reportWrapper').append(btnUpload);
};
