// UNTAPPED API Functions
var clientID = "client_id=FC8119633681CAC495EBE7A545DFE9E44106539F&client_secret=191A6A679166A61D170CBF54E8F5D7CA3CAF0F42";
var beerResult = ""
// $(document).ready(userInfo())


//COMMENTED OUT TO SAVE API CALL LIMIT
// document.onload = userInfo();

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
        console.log(beerResult.beer.beer_name);
        console.log(beerResult.beer.beer_description);
        console.log(beerResult.brewery.brewery_name);
        // console.log(beerResult.beer.beer_label)
        console.log(beerResult)
        addImage()
        addElement();


        function addElement() {
            // create a new div element
            const newDiv = document.createElement("div");
            const newImg = document.createElement("img");
            const lineBreak = document.createElement("br");
            newDiv.className = "beerResult"
            newImg.className = "beerResult"

            // // content for new div
            const beerContent = document.createTextNode(beerResult.beer.beer_name + " ");
            const breweryContent = document.createTextNode(beerResult.brewery.brewery_name + " ");
            const beerDescription = document.createTextNode(beerResult.beer.beer_description);

            // // add the text node to the newly created div
            newDiv.appendChild(beerContent);
            newDiv.appendChild(lineBreak);
            newDiv.appendChild(breweryContent);
            // newDiv.appendChild(lineBreak);
            // newDiv.appendChild(beerDescription);


            // add the newly created element and its content into the DOM
            const currentDiv = document.getElementById("div1");
            document.body.insertBefore(newDiv, currentDiv);
        }

        function addImage() {
            var label = document.createElement("img");
            label.setAttribute("src", beerResult.beer.beer_label);
            label.setAttribute("width", "304");
            label.setAttribute("height", "228");
            label.setAttribute("alt", beerResult.beer.beer_description);
            document.body.appendChild(x);
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
            var beerStyleResult = response.response.user.checkins.items[0].beer.beer_style
            var breweryResult = response.response.user.checkins.items[0].brewery.brewery_name
            var stamp = response.response.user.checkins.items[0].created_at
            console.log("***Start API call***")
            console.log(userNameResult);
            console.log(breweryResult);
            console.log(beerNameResult);
            console.log("Style: " + beerStyleResult);

            console.log(stamp)
            console.log("~~~~~~~~~~~~")
        });
    }

}

