$(document).ready(function() {
  $("#start-break").on('click', function() {
    updateOption("current-session-type", "break");
    updateOption("session-start-time", Date.now());
  });

  $("#start-work").on('click', function() {
    updateOption("current-session-type", "work");
    updateOption("session-start-time", Date.now());
  });

  $("#stop").on('click', function() {
    updateOption("current-session-type", null);
    updateOption("session-start-time", null);
  });

  updatePopup();
  setInterval(updatePopup, 100);
});

function updatePopup() {
  var $clockDisplay = $("#time-left");
  var $currentSessionType = $("#current-mode");

  if (inActiveSession()) {
    var deltaTime = Date.create(sessionEndsAt() - Date.now()).format("{m}:{ss}");
    $clockDisplay.show().text(deltaTime);
    $currentSessionType.text(readOptions()["current-session-type"] + "ing");

    $("#start-break, #start-work").hide();
    $("#stop").show();
  } else {
    $clockDisplay.hide();
    $currentSessionType.text("Fucking off");

    $("#start-break, #start-work").show();
    $("#stop").hide();
  }
}
