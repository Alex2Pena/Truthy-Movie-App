
'use strict'

// libraries
require('dotenv').config();
// const pg = require('pg');
const cors = require('cors');
const express = require('express');
// const superagent = require('superagent');
// const methodOverride = require('method-override');

// global variables
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors()); // Allows everyone to access our info
app.set('view engine','ejs'); // EJS templating engine looks for views folder
// app.use(methodOverride('_method')); // Turns a POST or GET into PUT or DELETE
app.use(express.static('./public')); // Serves our files from public
// app.use(express.ur lencoded({extended:true})); // Body parser

// setup PG
// const client = new pg.Client(process.env.DATABASE_URL);
// client.on('error', err => console.error(err));

app.get('/', (request,response) => {
  response.render('./index');
});
app.get('/search', (request, response)=>{
  console.log(request.query.search)
})



// const request = require('request');

// const options = {
//   method: 'GET',
//   //   type: 'JSON',
//   url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup',
//   qs: {term: 'scary movie', country: 'us'},
//   headers: {
//     'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
//     'x-rapidapi-key': '38e058ddb8msh0ab4bb9902ac5b2p1d7aa3jsn10ae3807ccee'
//   }

// };

// let videoArray = [];

// request(options, function (error, response, body) {
//   if (error)throw new Error(error);
//   let allResults = JSON.parse(response.body);
//   // console.log(body);
//   // console.log('Im testing this:', allResults.results)
//   allResults.results.forEach(result=>{
//     let newSearch = new Video(allResults.results);
//   });
//   // console.log('I am all results', allResults);
// });

// function Video(obj){
//   this.name = obj.name;
//   this.picture = obj.picture;
//   this.locations = obj.locations;
//   this.favorite = false;
//   videoArray.push(this);
//   // console.log('Iam the name:', obj.name)
//   // console.log('I am the locations:', obj.locations)
//   console.log('I am the videoArray', videoArray);
// }


// Turn everything on
// client.connect()
//     .then(() => {
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
});
// });
