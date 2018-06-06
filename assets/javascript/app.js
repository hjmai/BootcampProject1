//jonathans stuff
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
// hayden's stuff
// Initialize Firebase
var config = {
    apiKey: "AIzaSyABeGlxKmwxTzy_gCIbsHPd5FopDK7Sg3o",
    authDomain: "fire-rocks-7d02e.firebaseapp.com",
    databaseURL: "https://fire-rocks-7d02e.firebaseio.com",
    projectId: "fire-rocks-7d02e",
    storageBucket: "",
    messagingSenderId: "109705898493"
};
firebase.initializeApp(config);

var database = firebase.database();

var queryUrl = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/";
// var userSearch = whatever field we take for input
//declaring card variable to use later
var cardImage;
//declaring variable to store the created deck in
var testDeck;
//declaring variable for storing current deck state
var currentDeck;

//deck object class
class UserDeck {
    constructor(name, author) {
        this.name = name;
        this.author = author;
        this.cards = [];
        this.complete = false;
        this.deckId = (Math.ceil(Math.random() * 100000));
    }
    addCard(cardObject) {
        this.cards.push(cardObject);
    }
}

//on clicking submit, creating deck
$("#deckSubmit").on("click", function (e) {
    e.preventDefault();
    var deckName = $("#name").val().trim();
    var authorName = $("#author").val().trim();
    testDeck = new UserDeck(deckName, authorName)
    currentDeck = testDeck.deckId;
    console.log(testDeck);
    database.ref.set(testDeck);
})

//function for action after pressing add button
$("body").on("click", "button", function () {
    testDeck.addCard($(this).data('key'));
    console.log(testDeck);
})

//API call
$("#submitButton").on("click", function (e) {
    var userQ = $("#searchBar").val().trim()
    var fullUrl = queryUrl + userQ + "?collectible=1";
    e.preventDefault();
    $.ajax({
        url: fullUrl,
        headers:
            {
                "X-Mashape-Key": "S7jGwxLjYcmshC0yicFN1Q6Uq9Top1eA0DYjsnxQATIfAdbQnf"
            },
        method: "GET"
    }).then(function (response) {
        //function to show the cards on the screen
        console.log(response);
        $("#testDisplay").empty();
        function showResults() {
            for (var i = 0; i < response.length; i++) {
                cardImage = response[i].img
                var cardDiv = $("<div>")
                var displayImg = $("<img>")
                var addButton = $("<button>")
                addButton.html("Add");
                addButton.data("key", response[i]);
                displayImg.attr("src", cardImage);
                cardDiv.append(displayImg);
                cardDiv.append(addButton);
                $("#testDisplay").append(cardDiv);
            }

        };
        showResults();
    })
});

$('#search').keypress(function (e) {
    e.preventDefault();
    if (e.which == 13 && $('#search').val() !== '') {
        var value = $('#search').val();
        console.log($('#search').val())
        $('#search').val('');
        var column = $('<div class="col s4">');
        column.text(value);
        $('.mainRow').append(column);
    }
});

$(document).ready(function(){
    $('.modal').modal();
  });

 //copy from master 
  var queryUrl = "https://omgvamp-hearthstone-v1.p.mashape.com/cards";
var attackP = "?attack=";
var costP = "?cost=";
var durabilityP = "?durability=1";



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
