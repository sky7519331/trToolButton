// 定義URL遮罩與腳本路徑的對應型別
import { addButton as profileAddButton } from './tool/profile';
import { addButton as reportUploadAddButton } from './tool/reportUpload';

interface ScriptMapping {
    pattern: RegExp;
    scriptPath: () => void;
}

// 設定規則：每個規則包含URL的RegExp與對應腳本檔案(可調整路徑)
const scriptMappings: ScriptMapping[] = [
    { pattern: /\/profile/, scriptPath: profileAddButton },
    { pattern: /\/report/, scriptPath: reportUploadAddButton },
];

/**
 * 根據目前 URL，自動載入對應腳本。
 * @param url - 目前網址（通常為 window.location.pathname）
 */
export const loadScriptByUrl = async (url: string): Promise<void> => {
    for (const mapping of scriptMappings) {
        if (mapping.pattern.test(url)) {
            try {
                mapping.scriptPath();
                break;
            } catch (error) {
                console.error(`載入腳本失敗: ${mapping.pattern}`, error);
            }
        }
    }
};

// 實際使用：通常會以 window.location.pathname 當參數
loadScriptByUrl(window.location.pathname);
