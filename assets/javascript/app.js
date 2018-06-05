var queryUrl = "https://omgvamp-hearthstone-v1.p.mashape.com/cards";
var attackP = "?attack=";
var costP = "?cost=";
var durabilityP = "?durability=1";



// function call() {
//     $.ajax({
//         url: queryUrl,
//         headers :
//             {"X-Mashape-Key": "S7jGwxLjYcmshC0yicFN1Q6Uq9Top1eA0DYjsnxQATIfAdbQnf"
//             },
//         method: "GET"
//     }).then(function (response) {
//         console.log(response);
//     })
// }
// call();

$('.searchBtn').on('click', function() {
    event.preventDefault();
    var value = $('#searchCard').val();
    console.log(value);
    $('#searchCard').val('');
    var column = $('<div class="col s4">');
    column.text(value);
    $('.mainRow').append(column);
});

$('.save').on('click', function(){
    var deckName = $('#createDeck').val().trim();
    $('#createDeck').val('');
    var listItem = $('<li>');
    var button = $('<button class="btn purple deckBtn waves-effect">')
    button.text(deckName);
    listItem.append(button);
    $('.deckList').append(listItem);
});

$('.deckBtn').on('click', function(){
    $('.mainRow').empty();
})

$(document).ready(function(){
    $(".modal").modal();    
})