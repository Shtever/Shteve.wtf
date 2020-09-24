var count = 1
var x = ""

// Generate Random Number 
function random() {
    x = (Math.floor(Math.random() * 1000) + 1);
    console.log(x);
    check();
}

// Check if random number=goal number
function check() {
    if (x !== 69) {
        x = (Math.floor(Math.random() * 1000) + 1);
        count++;
        random()
    }
    else {
        console.log("Ya made it to 69 in " + count + " tries")
        alert("Ya made it to 69 in " + count + " tries")
    }
} 