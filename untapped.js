// UNTAPPED API Functions
var clientID="&client_id=FC8119633681CAC495EBE7A545DFE9E44106539F&client_secret=191A6A679166A61D170CBF54E8F5D7CA3CAF0F42"



$(document).ready(function () {
    var queryURL = "https://api.untappd.com/v4/beer/info/16630?" + clientID

    // Ajax call for lat/long based on user IP address //
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
    })
})