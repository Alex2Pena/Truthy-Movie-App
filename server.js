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
app.post('/favorites', handleFavorites);

app.post('/deleteFavorites', deleteFavorites);

function deleteFavorites (request, response) {
  console.log('id', request.body.id);

  let id = request.body.id;
  let sql = 'DELETE FROM items WHERE id=$1;';
  let safeValues = [id];

  client.query(sql, safeValues)
    .then(() => {
      response.redirect('/favorites');
    })
}

function renderFavorites (request, response){
  let sql = 'Select * FROM items;';
  client.query(sql)
    .then(res => {
      let videos = res.rows;
      // console.log('videos',videos);
      response.render('./favorites', ({apples : videos}));
    })}

function handleFavorites (request, response){
console.log('favorites request', request.body);

    let{name, picture, locations, comments} = request.body;
    let sql = 'INSERT INTO items (name, picture, locations, comments) VALUES ($1, $2, $3, $4);';
    let safeValues = [name, picture, locations, comments];
    
    client.query(sql, safeValues)
    // .then(response => {
    //     // let id = results.rows.id;
    //     response.render('./favorites');
    .then(() => {
      response.redirect('/favorites');
    })
    // })
}


//API Request
const request = require('request');
var videoArray = [];

function handleSearch (req, res){
  videoArray = [];
  let xyz = req.query.search
  const options = {
    method: 'GET',
    //   type: 'JSON',
    url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup',
    qs: {term: `${xyz}`, country: 'us'},
    headers: {
      'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',

      'x-rapidapi-key': `${process.env.UTELY_API_KEY}`}};
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          let allResults = JSON.parse(response.body);
          allResults.results.forEach(result=>{
            new Video(result);});
          res.render('./index', {bananas: videoArray})}
)};


function Video(obj){
  this.name = obj.name;
  this.picture = obj.picture;
  this.locations = obj.locations.map((value) => {
    return value.display_name;
  })
  // this.providericon = obj.locations.map((value) => {
    // console.log("inside .map", value.icon);
    // return value.icon;
// })
  this.comments = '';
// console.log('this.providericon', this.providericon);
videoArray.push(this);
};

client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`)
    })
  });
