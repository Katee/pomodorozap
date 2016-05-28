var eventList = [
  'onBeforeNavigate',
];

eventList.forEach(function(e) {
  chrome.webNavigation[e].addListener(function(data) {
    if (typeof data) {
      console.log("visiting", data.url)
      if (isWorking()) {
        urlMatchBanList(data.url);
      }
    }
  });
});

chrome.runtime.onStartup.addListener(function() {
  nav.resetDataStorage();
});
