var queryUrl = "https://omgvamp-hearthstone-v1.p.mashape.com/cards";
var attackP = "?attack=";
var costP = "?cost=";
var durabilityP = "?durability=1";



function call() {
    $.ajax({
        url: queryUrl,
        headers :
            {"X-Mashape-Key": "S7jGwxLjYcmshC0yicFN1Q6Uq9Top1eA0DYjsnxQATIfAdbQnf"
            },
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
}
call();