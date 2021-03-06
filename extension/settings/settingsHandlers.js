const settingsHandlers = () => {
    const checkbox = document.getElementById("shuffleCheckbox");

    chrome.storage.local.get("shuffle", ({ shuffle }) => {
        //console.log("initialstate", shuffle);
        if (shuffle) {
            toggleOn(checkbox);
        } else {
            toggleOff(checkbox);
        }
    });

    checkbox.addEventListener("click", () => {
        const on = checkbox.ariaChecked === "true" ? true : false;
        //console.log('on', on);
        if (on) {
            toggleOff(checkbox);
        } else {
            toggleOn(checkbox);
        }
        chrome.storage.local.set({ shuffle: !on });
    });

    const onOff = document.getElementById('onOffSwitch');
    chrome.storage.local.get("hidden", ({ hidden }) => {
        if (hidden) {
            toggleOn(onOff);
        } else {
            toggleOff(onOff);
        }
    })
    onOff.addEventListener('click', () => {
        const on = onOff.ariaChecked === "true" ? true : false;
        //console.log('on', on);
        if (on) {
            toggleOff(onOff);
        } else {
            toggleOn(onOff);
        }
        chrome.storage.local.set({ hidden: !on });
    })

    chrome.storage.local.get("avgmed", ({ avgmed }) => {
        if (!avgmed) return;
        //console.log(avgmed);
        const picked = document.getElementById(avgmed);
        //console.log(picked);
        picked.checked = true;
    });

    const avg = document.getElementById("avg");
    const med = document.getElementById("med");

    avg.addEventListener("change", () => {
        chrome.storage.local.set({ avgmed: "avg" });
    });

    med.addEventListener("change", () => {
        chrome.storage.local.set({ avgmed: "med" });
    });
}
