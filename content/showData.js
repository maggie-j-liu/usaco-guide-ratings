const editHead = (table) => {
  const head = table.querySelector("thead");
  const headRow = head.querySelector("tr");
  const otherHeaders = headRow.querySelectorAll("th");
  const ratingHead = document.createElement("th");
  ratingHead.className =
    "pl-4 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider";
  ratingHead.appendChild(document.createTextNode("Rating"));
  headRow.insertBefore(ratingHead, otherHeaders[4]);
  const qualityHead = document.createElement("th");
  qualityHead.className =
    "pl-4 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider";
  qualityHead.appendChild(document.createTextNode("Qual"));
  qualityHead.setAttribute("title", "Quality");
  headRow.insertBefore(qualityHead, otherHeaders[4]);
};

const showData = () => {
  const wholeTables = document.querySelectorAll("table.text-gray-500");
  //console.log(tables);
  for (const wholeTable of wholeTables) {
    editHead(wholeTable);
    const table = wholeTable.querySelector("tbody");
    const rows = table.querySelectorAll("tr");
    const rowArray = Array.from(rows);
    const hasSuggestButton = !rowArray[rowArray.length - 1].hasAttribute("id");
    if (hasSuggestButton) {
      rowArray.pop();
    }
    for (let i = rowArray.length - 1; i >= 0; i--) {
      table.deleteRow(0);
      const id = rowArray[i].id;
      const ratingCell = rowArray[i].insertCell(4);
      const qualityCell = rowArray[i].insertCell(5);
      const ratingCellWrapper = document.createElement('div');
      ratingCellWrapper.className = "flex items-center gap-2";
      ratingCell.className =
        "pl-4 py-4 whitespace-nowrap text-sm leading-5 font-medium";
      qualityCell.className =
        "pl-4 py-4 whitespace-nowrap text-sm leading-5 font-medium";

      if (!id.startsWith("problem-usaco")) {
        continue;
      }
      const usacoId = id.match(/[0-9]+$/)[0];

      chrome.storage.local.get([usacoId, "avgmed"], (result) => {
        let rating = "",
          quality = "";
        const rateAvgOrMed = result.avgmed === "med" ? "rateMed" : "rateAvg";
        const qualAvgOrMed = result.avgmed === "med" ? "qualMed" : "qualAvg";
        if (result[usacoId]) {
          if (result[usacoId][rateAvgOrMed] !== null) {
            rating = "" + Math.round(parseFloat(result[usacoId][rateAvgOrMed]));
          }
          if (result[usacoId][qualAvgOrMed] !== null) {
            quality = "" + Math.round(parseFloat(result[usacoId][qualAvgOrMed]));
          }
        }
        if (rating !== "") {
          const icon = getRatingIconColor(parseInt(rating));
          ratingCellWrapper.appendChild(icon.icon);
          ratingCellWrapper.className += ` ${icon.colorClass}`
        }
        ratingCellWrapper.appendChild(document.createTextNode(rating));
        ratingCell.appendChild(ratingCellWrapper)
        if (quality !== "") {
          qualityCell.className += ` ${getQualityColor(parseInt(quality))}`;
        }
        qualityCell.appendChild(document.createTextNode(quality));
      });
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
