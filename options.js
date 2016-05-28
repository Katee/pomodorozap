$(document).ready(function(){ restoreOptions(readOptions()); });
$('button#save').on('click', saveOptions);
$('button#defaults').on('click', restoreOptions);
