const getData = async () => {
  chrome.runtime.sendMessage(null, (data) => console.log(data));
  //console.log(response);
};

const extensionScript = () => {
  console.log("running");
  let prev = "";
  //getData();
  setInterval(() => {
    const path = window.location.href.split("?")[0];
    if (path == prev) {
      return;
    }
    prev = path;

    chrome.storage.local.get("shuffle", ({ shuffle }) => {
      console.log(shuffle);
      if (shuffle) {
        shuffleRows();
      }
    });

    showData();
  }, 500);
};

const runAfterTimeOut = () => {
  setTimeout(extensionScript, 100);
};

window.addEventListener("load", runAfterTimeOut);
