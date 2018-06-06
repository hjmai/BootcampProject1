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


//on clicking save in deck create modal, creating deck
$('.save').on('click', function(){
    var deckName = $("#createDeck").val().trim();
    var authorName = $("#addAuthor").val().trim();
    testDeck = new UserDeck(deckName, authorName)
    currentDeck = testDeck.deckId;
    console.log(testDeck);
    console.log("test");
    var button = $('<button class="btn purple deckBtn waves-effect">')
    button.text(deckName);
    $('.deckList').append(button);
});

//function for action after pressing add button
$("body").on("click", ".addButton", function () {
    testDeck.addCard($(this).data('key'));
    console.log(testDeck);
})

//API call
$('.searchBtn').on("click", function (e) {
    var userQ = $("#searchCard").val().trim()
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
        $(".mainRow").empty();
        function showResults() {
            for (var i = 0; i < response.length; i++) {
                cardImage = response[i].img
                var cardDiv = $("<div>")
                var displayImg = $("<img>")
                var addButton = $('<button class="btn purple deckBtn waves-effect">')
                addButton.html("Add").addClass("addButton");
                addButton.data("key", response[i]);
                displayImg.attr("src", cardImage);
                cardDiv.append(displayImg);
                cardDiv.append(addButton);
                var column = $('<div class="col s4">');
                column.html(cardDiv);
                $('.mainRow').append(column);
            }

        };
        showResults();
    })
});

//my search function
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
