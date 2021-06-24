const settingsScript = () => {
    let prev = "";
    setInterval(() => {
        const path = window.location.href;
        if (path == prev) {
            return;
        }
        prev = path;
        console.log(window.location.pathname);
        console.log(window.location.hash);
        if (!window.location.pathname.includes('settings') 
            || (window.location.hash !== "" 
                && window.location.hash !== "#general")) {
            return;
        }
        initUi();
        settingsHandlers();
    }, 1000);
};

/*
const runAfter = () => {
    setTimeout(settingsScript, 100);
};
*/

window.addEventListener("load", settingsScript);