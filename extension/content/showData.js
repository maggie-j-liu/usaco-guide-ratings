const editHead = (table, addRating, addQuality, insertPos) => {
  const head = table.querySelector("thead");
  const headRow = head.querySelector("tr");
  const otherHeaders = headRow.querySelectorAll("th");
  if (addRating) {
    const ratingHead = document.createElement("th");
    ratingHead.className =
      "pl-4 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider";
    ratingHead.appendChild(document.createTextNode("Rating"));
    headRow.insertBefore(ratingHead, otherHeaders[insertPos]);
  }
  if (addQuality) {
    const qualityHead = document.createElement("th");
    qualityHead.className =
      "pl-4 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider";
    qualityHead.appendChild(document.createTextNode("Qual"));
    qualityHead.setAttribute("title", "Quality");
    headRow.insertBefore(qualityHead, otherHeaders[insertPos]);
  }
};

const get = keys => new Promise((resolve, reject) => {
  chrome.storage.local.get(keys, result => resolve(result));
})

const showData = async () => {
  const wholeTables = document.querySelectorAll("table.text-gray-500");
  //console.log(tables);
  for (const wholeTable of wholeTables) {
    const table = wholeTable.querySelector("tbody");
    const rows = table.querySelectorAll("tr");
    const rowArray = Array.from(rows);
    const hasSuggestButton = !rowArray[rowArray.length - 1].hasAttribute("id");
    if (hasSuggestButton) {
      rowArray.pop();
    }
    const qualityNum = [], ratingNum = [];
    let foundQuality = false, foundRating = false;
    for (let i = 0; i < rowArray.length; i++) {
      const id = rowArray[i].id;
      if (!id.startsWith("problem-usaco")) {
        qualityNum.push(null);
        ratingNum.push(null);
        continue;
      }
      const usacoId = id.match(/[0-9]+$/)[0];
      const result = await get([usacoId, "avgmed"]);
      //console.log(result);
      let rating = null,
        quality = null;
      const rateAvgOrMed = result.avgmed === "med" ? "rateMed" : "rateAvg";
      const qualAvgOrMed = result.avgmed === "med" ? "qualMed" : "qualAvg";
      if (result[usacoId]) {
        if (result[usacoId][rateAvgOrMed] !== null) {
          rating = Math.round(parseFloat(result[usacoId][rateAvgOrMed]));
          foundRating = true;
        }
        if (result[usacoId][qualAvgOrMed] !== null) {
          quality = parseFloat(result[usacoId][qualAvgOrMed]);
          quality = Math.round(quality * 10) / 10;
          foundQuality = true;
        }
      }
      qualityNum.push(quality);
      ratingNum.push(rating);
    }
    let insertPos;
    if (rowArray[0].cells.length === 6) {
      insertPos = 4;
    } else { // if difficulty and tags are hidden
      insertPos = 3;
    }
    editHead(wholeTable, foundRating, foundQuality, insertPos);
    for (let i = 0; i < rowArray.length; i++) {
      table.deleteRow(0);
      if (foundRating) {
        const ratingCell = rowArray[i].insertCell(insertPos);
        const ratingCellWrapper = document.createElement('div');
        ratingCellWrapper.className = "flex items-center gap-2";
        ratingCell.className =
          "pl-4 py-4 whitespace-nowrap text-sm leading-5 font-medium";
        if (ratingNum[i] !== null) {
          const icon = getRatingIconColor(ratingNum[i]);
          ratingCellWrapper.appendChild(icon.icon);
          ratingCellWrapper.className += ` ${icon.colorClass}`
          ratingCellWrapper.appendChild(document.createTextNode(ratingNum[i]));
          ratingCell.appendChild(ratingCellWrapper)
        }
      }
      if (foundQuality) {
        const qualityCell = rowArray[i].insertCell(insertPos + 1);
        const qualityCellWrapper = document.createElement('div');
        qualityCellWrapper.className = "flex items-center justify-between w-12";
        qualityCell.className =
          "pl-4 py-4 whitespace-nowrap text-sm leading-5 font-medium";
        if (qualityNum[i] !== null) {
          const icon = getQualityIconColor(qualityNum[i]);
          qualityCellWrapper.appendChild(document.createTextNode(qualityNum[i]));
          qualityCellWrapper.appendChild(icon.icon);
          qualityCellWrapper.className += ` ${icon.colorClass}`;
          qualityCell.appendChild(qualityCellWrapper);
        }
      }
    }
    if (hasSuggestButton) {
      for (const row of rowArray) {
        table.insertBefore(row, table.lastChild);
      }
    } else {
      for (const row of rowArray) {
        table.appendChild(row);
      }
    }
  }
};
