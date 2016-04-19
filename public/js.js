'use strict'

$(function() {
  var $h1 = $("h1") // get header to hange when loading
  var $zip = $("input[name='zip']") // get element with zip data

  // on submission of form get data and send to server
  $("form").on("submit", function(event){
    // stop default sending of data to server by browser
    event.preventDefault()
    // get value of zip entered and ensure proper formatting
    var zipCode = $.trim($zip.val())

    $h1.text("Loading data...")

    var request = $.ajax({
      url: "/" + zipCode,
      dataType: "json"
    })
    // once request is done get data from server and display on page
    request.done(function(data){
      $h1.text("It is " + data.temperature + "ºF in " + data.city + ", " + data.state +".")
    })
    // if request failed show that it failed
    request.fail(function() {
      $h1.text("Error!")
    })

  }) // end of form submit event handler
})
