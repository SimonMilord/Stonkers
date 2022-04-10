# Stonkers Stock Tracking App

Stonkers is a fully responsive web app that allows the user, once logged in to their account, to look up quotes, charts, news and stats of stocks. It also allows the user to add their favorite stocks to a watchlist for them to keep track of.

## The Problem

The stock market and the world of investments is one that is gatekept by unnecessary noise and complexity by traditional incumbents. Many are afraid to take control over their financial situation because it all seems too complex  and time consuming to learn and manage. Stonkers seek to provide beginners and new investor a simple to use interface to help them keep an eye on their investments.

## Demo

[Click here](https://stonkers.netlify.app/) to see the live demo

## Screenshots

<img src="https://github.com/SimonMilord/Capstone-Project/blob/f1e3ddfa87636d26eadaceb042386ce8cde9a21b/Screenshots/Stonkers%20-%20Login.png" width=50% height=50%><img src="https://github.com/SimonMilord/Capstone-Project/blob/f1e3ddfa87636d26eadaceb042386ce8cde9a21b/Screenshots/Stonkers%20-%20Home%20Top.png" width=50% height=50%><img src="https://github.com/SimonMilord/Capstone-Project/blob/f1e3ddfa87636d26eadaceb042386ce8cde9a21b/Screenshots/Stonkers%20-%20Home%20Bottom.png" width=50% height=50%><img src="https://github.com/SimonMilord/Capstone-Project/blob/f1e3ddfa87636d26eadaceb042386ce8cde9a21b/Screenshots/Stonkers%20-%20watchlist.png" width=50% height=50%>


## Tech Stack
Client:
[React.js](https://reactjs.org/),
[Sass](https://sass-lang.com/),
[Axios](https://axios-http.com/),
[Charts.js](https://www.chartjs.org/),
[Material UI](https://mui.com/)


Server:
[Express](https://expressjs.com/),
[Node.js](https://nodejs.org/en/),
[MongoDB](https://www.mongodb.com/),
[Mongoose](https://mongoosejs.com/),
[JWT](https://jwt.io/)

Deployment:
[Netlify](https://www.netlify.com/),
[Heroku](https://id.heroku.com/login)

API: [Finnhub](https://finnhub.io/)

## Environment Variables
Add the following variables in client .ENV file

Client: 

REACT_APP_API_URL=https://finnhub.io/api/v1
REACT_APP_API_KEY=<enter your api key>
REACT_APP_SERVER_URL=http://localhost:8080/user
REACT_APP_JWT_SECRET=<enter your jwt secret>
  
Server:
  
PORT = 8080
JWT_SECRET=<enter your JWT secret>
  
You can generate JWT secrets [here](https://jwt.io/)

## Usage
To run this project locally, follow these steps:

clone the repository
$ git clone https://github.com/SimonMilord/Capstone-Project.git

go into the server
$ cd capstone/server

install server dependencies
$ npm install

start the server
$ node index.js

go into the client
$ cd ../client

install server dependencies
$ npm install

start the client
$ npm start


## Contact
This web app was designed and developed by Simon Milord.

Feel free to follow me on [Github](https://github.com/SimonMilord) or [LinkedIn](https://www.linkedin.com/in/simonmilord/)
