// UNTAPPED API Functions
var clientID = "client_id=FC8119633681CAC495EBE7A545DFE9E44106539F&client_secret=191A6A679166A61D170CBF54E8F5D7CA3CAF0F42";
var beerResult = ""
// $(document).ready(userInfo())



document.onload = userInfo();

//SUBMIT BUTTON
function submit() {
    // console.clear()
    var beerName = document.getElementById('beerName').value;
    console.log(beerName);
    beerSearch();
}


function beerSearch() {
    // BEER BY ID //
    // var queryURL = "https://api.untappd.com/v4/beer/info/16630?" + "&" + clientID //

    // BEER BY SEARCH TERM //
    var queryURL = "https://api.untappd.com/v4/search/beer?q=" + beerName.value + "&limit=20&sort=beer_name&" + clientID

    // Ajax call to Untappd
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var beerResult = response.response.beers.items[0];
        console.log(beerResult.beer.beer_name)
        console.log(beerResult.brewery.brewery_name)
        setTimeout(addElement(), 1000)
        function addElement() {
            // create a new div element
            const newDiv = document.createElement("div");
            newDiv.className = "beerResult"

            // // and give it some content
            const newContent1 = document.createTextNode(beerResult.beer.beer_name);
            const newContent2 = document.createTextNode(beerResult.brewery.brewery_name);

            // // add the text node to the newly created div
            newDiv.appendChild(newContent1);
            newDiv.appendChild(newContent2);

            // add the newly created element and its content into the DOM
            const currentDiv = document.getElementById("div1");
            document.body.insertBefore(newDiv, currentDiv);
        }
    })
}


// USER INFO //
function userInfo() {
    //Single username (For testing - so we don't hit API call limit)
    var userName = ["Quille"]

    //Full array of Usernames
    // var userName = ["Mr_JFlow", "Quille", "Shtevetm"]

    for (let i = 0; i < userName.length; i++) {
        var queryURL = "https://api.untappd.com/v4/user/info/" + userName[i] + "?" + clientID

        // Ajax call to Untappd //
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var userNameResult = response.response.user.user_name
            var beerNameResult = response.response.user.checkins.items[0].beer.beer_name
            var stamp = response.response.user.checkins.items[0].created_at
            console.log(userNameResult);
            console.log(beerNameResult);
            console.log(stamp)
            console.log("~~~~~~~~~~~~")
        });
    }

}

