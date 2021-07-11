const fetchUrl = "https://codetiger.me/project/usaco/backend/data.php";
const fetchOptions = {
  headers: {
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: "type=1",
  method: "POST",
};

const fetchData = async () => {
  const req = await fetch(fetchUrl, fetchOptions);
  const data = await req.json();
  return data;
};

const saveData = (data) => {
  for (const entry of data) {
    if (!entry.url) {
      continue;
    }
    const trailingCodeMatch = entry.url.match(/([0-9]+)\/?$/);
    if (trailingCodeMatch === null) {
      continue;
    }
    const usacoId = trailingCodeMatch[1];
    const diffRaters = entry.cnt1,
      qualRaters = entry.cnt2;
    const qualAvg = entry.quality,
      qualMed = entry.quality2;
    const rateAvg = entry.rating,
      rateMed = entry.rating2;
    const valObj = {
      diffRaters,
      qualRaters,
      qualAvg,
      qualMed,
      rateAvg,
      rateMed,
    };
    chrome.storage.local.set({ [usacoId]: valObj }, () => {
      //console.log('Value of ' + usacoId +  ' is set to ' + JSON.stringify(valObj));
    });
  }
};

chrome.runtime.onInstalled.addListener(() => {
  //console.log("installed");
  //set up alarm
  chrome.alarms.create("getData", {
    //when: Date.now() + 60 * 1000,
    when: Date.now(),
    periodInMinutes: 120
  });
  //set defaults
  chrome.storage.local.get(["avgmed", "shuffle", "hidden"], ({ avgmed, shuffle, hidden }) => {
    //console.log(avgmed);
    if (avgmed === undefined) {
      chrome.storage.local.set({ avgmed: "avg" });
    }
    if (shuffle === undefined) {
      //console.log('[background]', 'shuffle', shuffle)
      chrome.storage.local.set({ shuffle: false });
    }
    if (hidden === undefined) {
      chrome.storage.local.set({ hidden: false });
    }
  });
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  //console.log('alarm', alarm.name);
  const req = await fetch(fetchUrl, fetchOptions);
  const data = await req.json();
  //console.log(data);
  saveData(data);
});
