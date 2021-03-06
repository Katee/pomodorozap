var SESSION_NAMES = ["work", "break"];
var ZAP_URL = "http://pomodorozap.com:8001/";
var ZAP_MESSAGES = [
  "Was that a good idea?",
  "GET BACK TO WORK",
  "pffft slacker"
];

function createNotification(message) {
  chrome.notifications.create("pomodoro-zap", {type: "basic", title: "Pomodoro Zap", message: message, iconUrl: "logo.png"}, null);
}

function zap() {
  createNotification(ZAP_MESSAGES.sample());

  function reqListener () {
    console.log(this.responseText);
  }

  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", ZAP_URL);
  oReq.send();
}

function createPattern(bannedPatternString) {
  // this would match "notreddit.com" if your bannedPatternString was "reddit.com" but I don't care
  return new RegExp("(.*)" + bannedPatternString + "(.*)");
}

function urlMatchBanList(url) {
  var bannedPatterns = (readOptions().forbidden.split("\n") || []).map(function(string) {
    return createPattern(string);
  });

  console.log(bannedPatterns)

  var anyMatches = bannedPatterns.any(function(bannedPattern) {
    return bannedPattern.test(url);
  });

  if (anyMatches) {
    zap();
  }
}

function inActiveSession() {
  return readOptions()["current-session-type"] != null;
}

function isWorking() {
  return readOptions()["current-session-type"] == "work";
}

function sessionType() {
  return readOptions()["current-session-type"];
}

function sessionEndsAt() {
  var sessionStartTime = readOptions()["session-start-time"];
  var sessionLength = readOptions()[sessionType() + "_length_seconds"];
  return sessionStartTime + (sessionLength * 1000);
}

// options
function restoreOptions(conf) {
  $("#forbidden").val(conf["forbidden"])

  SESSION_NAMES.forEach(function(timeName) {
    var lengthSeconds = conf[timeName + "_length_seconds"];
    $("#" + timeName + "-length-minutes").val(Math.floor(lengthSeconds / 60));
    $("#" + timeName + "-length-seconds").val(lengthSeconds % 60);
  });
}

function readOptions() {
  return JSON.parse(localStorage['options'] || "{}");
}

// Write all options to local storage.
function saveOptions() {
  var options = {};

  options["forbidden"] = $("#forbidden").val();

  SESSION_NAMES.forEach(function(timeName) {
    options[timeName + "_length_seconds"] = (parseInt($("#" + timeName + "-length-minutes").val() || 0) * 60) + parseInt($("#" + timeName + "-length-seconds").val() || 0);
  })

  // save
  localStorage['options'] = JSON.stringify(options);

  // provide feedback
  $('#status').text('Options saved');
  setTimeout(function() {
    $('#status').text('');
  }, 750);
}

function updateOption(name, value) {
  var options = readOptions();
  options[name] = value;
  localStorage['options'] = JSON.stringify(options);
}
