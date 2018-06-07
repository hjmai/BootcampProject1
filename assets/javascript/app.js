var selectedDeck;
//adds cards to deck, if it is the first card, we remove the placeholder in array
function addCard(cardObject) {
    if (selectedDeck.firstCard) {
        selectedDeck.cards.shift();
        selectedDeck.cards.push(cardObject);
        selectedDeck.firstCard = false;
    }
    else {
        selectedDeck.cards.push(cardObject);
    }

}

//function for drawing cards
function drawCards() {
    var mainCardDiv = $("<div>");
    var mainDisplayImg = $('<img class="responsive-img">');
    mainDisplayImg.attr("src", cardImage);
    mainCardDiv.append(mainDisplayImg);
    var column = $('<div class="col s4">');
    column.html(mainCardDiv);
    $('.mainRow').prepend(column);
}

//when you select a deck
$('body').on('click', '.deckBtn', function () {
    $('.mainRow').empty();
    selectedDeck = $(this).data('key');
    for (var i = 0; i < selectedDeck.cards.length; i++) {
        cardImage = selectedDeck.cards[i].img
        drawCards();
    }
    $("#currentDeckDisplay").html("Current Deck: " + selectedDeck.name);
})

$(document).ready(function () {
    $(".modal").modal();
});
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
var selectedDeck;

//deck object class
class UserDeck {
    constructor(name, author) {
        this.name = name;
        this.author = author;
        //initialze array with placeholder value because firebase can't hold empty arrays
        this.cards = [1];
        this.complete = false;
        this.firstCard = true;
        this.deckId = (Math.ceil(Math.random() * 100000));
    }
};


//on clicking save in deck create modal, creating deck and selecting it for editing
$('.save').on('click', function () {
    var deckName = $("#createDeck").val().trim();
    var authorName = $("#addAuthor").val().trim();
    selectedDeck = new UserDeck(deckName, authorName);
    database.ref('decks/' + selectedDeck.deckId).set({
        selectedDeck
    });
});

//function for action after pressing add button
$("body").on("click", ".addBtn", function () {
    if (selectedDeck.cards.length < 29) {
        addCard($(this).data('key'));
        database.ref('decks/' + selectedDeck.deckId).set({
            selectedDeck
        });
        $(".mainRow").empty();
        for (var i = 0; i < selectedDeck.cards.length; i++) {
            cardImage = selectedDeck.cards[i].img
            drawCards();
        }
    }
    else {
        alert("Too many cards dude");
    }
})


//API call
$('.searchBtn').on("click", function (e) {
    var userQ = $("#searchCard").val().trim();
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
        // console.log(response);
        $("#searchRow").empty();
        console.log(response);
        function showResults() {
            for (var i = 0; i < response.length; i++) {
                cardImage = response[i].img
                var cardDiv = $("<div>")
                var displayImg = $("<img>")
                var addButton = $('<button class="btn purple addBtn waves-effect">')
                addButton.html("Add").addClass("addButton");
                addButton.data("key", response[i]);
                addButton.attr("data-img", response[i].img);
                displayImg.attr("src", cardImage);
                cardDiv.append(displayImg);
                cardDiv.append(addButton);
                var column = $('<div class="col s4">');
                column.html(cardDiv);
                $('#searchRow').append(column);
            };

        };
        showResults();
    })
});

//grabbing decks from database and showing them in sidebar and showing new cards as they are added
database.ref('decks/').on('value', function (snapshot) {
    $('.deckList').empty();
    drawCards();
    snapshot.forEach(function (childSnapshot) {
        var obj = childSnapshot.val();
        var button = $('<button class="btn purple deckBtn waves-effect">');
        button.data("key", obj.selectedDeck);
        button.text(obj.selectedDeck.name);
        $('.deckList').append(button);
        console.log(childSnapshot.val());
    })

})

//my search function
$('#search').keypress(function (e) {
    e.preventDefault();
    if (e.which == 13 && $('#search').val() !== '') {
        var value = $('#search').val();
        $('#search').val('');
        var column = $('<div class="col s4">');
        column.text(value);
        $('.mainRow').append(column);
    }
});

$(document).ready(function () {
    $('.modal').modal();
});
$(document).ready(function () {
    $('select').formSelect();
});