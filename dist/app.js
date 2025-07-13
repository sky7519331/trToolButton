"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const const_1 = require("./config/const");
const getDate = () => (0, moment_1.default)().format("MM/DD\tHH:mm:ss");
const getPlayerScore = (keyWork) => {
    const playerScore = $("tr")
        .has(`th:contains("${keyWork}")`)
        .find(".value")
        .text()
        .replace(keyWork, "");
    return playerScore || "0";
};
const getEquipment = (className) => {
    const classAttr = $(className)
        .find(`.heroItem${className} .item`)
        .attr("class");
    if (!classAttr)
        return "";
    const equipmentClass = classAttr.replace('item ', '').trim();
    return const_1.EQUIPMENT_MAP[equipmentClass] || "";
};
const getData = () => {
    const playerScore = const_1.playerScoreKeyList.map(getPlayerScore);
    const heroInfo = playerScore.join("\t");
    const playerEquipmentKey = const_1.playerEquipmentKeyList.map(getEquipment);
    const heroEquipment = playerEquipmentKey.join("\t");
    const villageList = $(".villages").find("tbody > tr");
    let villageInfo = "";
    villageList.each((_, village) => {
        const inhabitants = $(village).find(".inhabitants").text();
        villageInfo += `${inhabitants}\t`;
    });
    const copyText = `${getDate()}\t${heroInfo}\t\t${heroEquipment}\t${villageInfo}`;
    navigator.clipboard.writeText(copyText);
    alert(`Save ${copyText}`);
};
const addButton = () => {
    const btnUpload = $('<button>');
    btnUpload.text('上傳');
    btnUpload.css({
        'padding': '6px 18px',
        'background': 'lightgreen',
        'border-radius': '6px',
        'border': '2px solid #000'
    });
    $(".titleInHeader").append(btnUpload).on('click', getData);
};
addButton();
//# sourceMappingURL=app.js.map