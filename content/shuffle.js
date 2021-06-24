const shuffleRows = () => {
  const tables = document.querySelectorAll("table.text-gray-500 tbody");
  for (const table of tables) {
    const rows = table.querySelectorAll("tr");
    //console.log(Array.from(rows));
    const rowArray = Array.from(rows);
    const hasSuggestButton = !rowArray[rowArray.length - 1].hasAttribute("id");
    if (hasSuggestButton) {
      rowArray.pop();
    }
    for (let i = rowArray.length - 1; i >= 0; i--) {
      table.deleteRow(0);
      let j = Math.floor(Math.random() * (i + 1));
      [rowArray[i], rowArray[j]] = [rowArray[j], rowArray[i]];
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
