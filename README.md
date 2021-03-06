# https://heroku-firerocks-8080.herokuapp.com/
# Team Snowstorm
## Our Team:
* Jonathan Mai
* Hayden VonCannon
* Brendan Falagrady
* Alex Mehr
## FireRocks Project

### Technology Used:
* [Hearthstone API](https://market.mashape.com/omgvamp/hearthstone)
* [MaterializeCSS](https://materializecss.com/)
* [Firebase](https://firebase.google.com/)

### Project Description:
This project will be mainly utilizing the [Hearthstone API](https://market.mashape.com/omgvamp/hearthstone). For our project, we plan on creating user logins and users will be able to search for cards, add it to a deck and it will save to the user. 

### Breakdown of Tasks for MVP
* Landing page layout
![Page Layout](./assets/images/DefaultLayout.png)
* On Page Load
  * Checks firebase for what decks are available
  * Populates sidebar with decks
* Clicking on deck
  * Populates main body with images of all cards in that deck
* Add Deck
  * Click on button to add a new deck to sidebar
  * Creates an object in firebase
* Adding cards
  * Input card name in search field
  * Click submit
  * ajax api to hearthstone, will search for card name and return the card image with add button underneath in a modal
  * Clicking add will add the card to the main body area where deck content is shown
  * Appends deck with newly saved card
### Future Plans
* Create a user login with email and password, add to Firebase as an object (look into modal)
  * A user object will contain: 
    * userName
    * password
    * Decks
      * Name of deck
      * Array of cards
* Clicking login check firebase for the username and if the password is the same
  * Successful login will populate right side of page with users decks
  * User can add decks
    * Prompt user for a deck name, save the object and store it onto firebase
  * Clicking on decks will populate main page with the array of cards (if nothing then itll be empty until adding cards)

### Bugs
* Not clearing main row div when someone else adds a deck
