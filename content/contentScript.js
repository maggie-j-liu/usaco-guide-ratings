const extensionScript = () => {
  //console.log("running");
  let prev = "";
  setInterval(async () => {
    const path = window.location.href.split("?")[0];
    if (path == prev) {
      return;
    }
    prev = path;

    await showData(); // needs to be first or will overwrite shuffle
    chrome.storage.local.get("shuffle", async ({ shuffle }) => {
      //console.log(shuffle);
      if (shuffle) {
        shuffleRows();
      }
    });
  }, 500);
};

/*
const runAfterTimeOut = () => {
  setTimeout(extensionScript, 100);
};
*/

window.addEventListener("load", extensionScript);
