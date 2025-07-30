import moment from "moment";
import { EQUIPMENT_MAP, playerEquipmentKeyList, playerScoreKeyList } from "../config/const";
import { getButton } from "../utils/common";

const getDate = () => moment().format("MM/DD\tHH:mm:ss");

const getPlayerScore = (keyWork: string) => {
  const playerScore = $("tr")
    .has(`th:contains("${keyWork}")`)
    .find(".value")
    .text()
    .replace(/[^\d]/g, "");
  return playerScore || "0";
};

const getEquipment = (keyWork: string) => {
  const classAttr = $(`[data-slot="${keyWork}"]`)
    .find(".item")
    .attr("class");
  if (!classAttr) return "";

  const equipmentClass = classAttr.replace('item ', '').trim();
  return EQUIPMENT_MAP[equipmentClass] || "";
};

const getData = () => {
  const playerScore = playerScoreKeyList.map(getPlayerScore);
  const heroInfo = playerScore.join("\t");

  const playerEquipmentKey = playerEquipmentKeyList.map(getEquipment);
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
  const btnUpload = getButton("複製");
  btnUpload.on('click', getData);
  $('.titleInHeader').append(btnUpload);
};

addButton();
