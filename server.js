
'use strict'

// libraries
require('dotenv').config();
const pg = require('pg');
const cors = require('cors');
const express = require('express');
const superagent = require('superagent');
const methodOverride = require('method-override');

// global variables
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors()); // Allows everyone to access our info
app.set('view engine','ejs'); // EJS templating engine looks for views folder
app.use(methodOverride('_method')); // Turns a POST or GET into PUT or DELETE
app.use(express.static('./public')); // Serves our files from public
app.use(express.urlencoded({extended:true})); // Body parser

// setup PG
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

app.get('/', handleSearch);
app.get('/about', (request,response) => {response.render('./about');});
// app.get('/favorites', (request,response) => {response.render('./favorites');});
app.get('/favorites', renderFavorites);
app.get('/search', handleSearch);

app.get('/deleteFavorites/:result.id', deleteFavorites);

function deleteFavorites (request, response) {
// get id of the button that was selected
// take id/name into sql and delete all with that name
// re-render favorites page
console.log(request);
  console.log("params id", request.params.result.id);
  let {title, authors, description, image, isbn} = request.body;
  let id = request.params.video_id;

  let sql = 'UPDATE books SET title=$1, authors=$2, description=$3, image=$4, isbn=$5 WHERE id=$6;';

  let safeValues = [title, authors, description, image, isbn];

  client.query(sql, safeValues)
      .then(() => {
          response.redirect('/');
      })
}
















function renderFavorites (request, response){
  
    let sql = 'Select * FROM items;';
    
    client.query(sql)
    .then(res => {
      let videos = res.rows;
      // console.log('videos',videos);
        response.render('./favorites', ({apples : videos}));
})};

app.post('/favorites', handleFavorites);

function handleFavorites (request, response){
// console.log('favorites request', request.body);

    let{name, picture, locations, providerIcon} = request.body;
    let sql = 'INSERT INTO items (name, picture, locations, providerIcon) VALUES ($1, $2, $3, $4);';
    let safeValues = [name, picture, locations, providerIcon];
    
    client.query(sql, safeValues)
    // .then(response => {
    //     // let id = results.rows.id;
    //     response.render('./favorites');
      
    // })
}


//API Request
const request = require('request');

var videoArray = [];
console.log(videoArray);

function handleSearch (req, res){
  videoArray = [];
   let xyz = req.query.search
  // console.log('xyz is', xyz);
  
  const options = {
    method: 'GET',
    //   type: 'JSON',
    url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup',
    qs: {term: `${xyz}`, country: 'us'},
    headers: {
      'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
      'x-rapidapi-key': '38e058ddb8msh0ab4bb9902ac5b2p1d7aa3jsn10ae3807ccee'}};
  // console.log("options is", options);
  
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          
          let allResults = JSON.parse(response.body);
          allResults.results.forEach(result=>{
            new Video(result);
          });
          res.render('./index', {bananas: videoArray})
  }
)};

function Video(obj){
  this.name = obj.name;
  this.picture = obj.picture;
  this.locations = obj.locations.map((value) => {
      return value.display_name;
  })
  this.providerIcon = obj.locations.map((value) => {
    // console.log("inside .map", value.icon);
    return value.icon;
})
// console.log('this.providerIcon', this.providerIcon);
videoArray.push(this);
};

// Turn everything on
client.connect()
    .then(() => {
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
  })
});
