var goal = 69;
var count = 1;
var x = "";

// Generate Random Number 
function random() {
    x = (Math.floor(Math.random() * 100) + 1);
    console.log(x);
    check();
}

// Check if random number=goal number
function check() {
    if (x !== goal) {
        x = (Math.floor(Math.random() * 100) + 1);
        count++;
        random()
    }
    else {
        console.log("Ya made it to " + goal + " in " + count + " tries")
        // alert("Ya made it to " + goal + " in " + count + " tries")
    }
} 

random()