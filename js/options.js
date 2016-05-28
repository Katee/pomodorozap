// Update the options page to display all the options widgets with their default values.
// If a configuration object is given, use it to set the options instead of the defaults.
// Optional<Object> -> void
function restore_options(conf) {
  $("#forbidden").val(conf["forbidden"])
}

// Write all options to local storage.
function save_options(evt) {
  // serialize options
  var options = {};
  options["forbidden"] = $("#forbidden").val();

  console.log(options);
  // save
  localStorage['options'] = JSON.stringify(options);

  // provide feedback
  $('#status').text('Options saved.');
  setTimeout(function() {
    $('#status').text('');
  }, 750);
}

function read_options() {
  var savedOptions = localStorage['options'] || {};
  return JSON.parse(savedOptions);
}

$(document).ready(function(){ restore_options(read_options()); });
$('button#save').on('click', save_options);
$('button#defaults').on('click', restore_options);
