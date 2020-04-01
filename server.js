
'use strict'

// libraries
require('dotenv').config();
// const pg = require('pg');
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
//const client = new pg.Client(process.env.DATABASE_URL);
//client.on('error', err => console.error(err));

// app.get('/', (request,response) => {
//   response.render('./index');
  
  
});


app.get('/about', (request,response) => {
  response.render('./about');
});

app.get('/favorites', (request,response) => {
  response.render('./favorites');
});

app.get('/search', (request, response)=>{
  console.log(request.query.search)
})



// app.get('/search', (request, response)=>{
//   //console.log(request.query.search);
//   let thingTheyAreSearchingFor = request.query.search;
//   return thingTheyAreSearchingFor;
// });

app.get('/search', handleSearch);



// app.post('/search', (request, response) => {//recives searches from front end
//   console.log(request.body);
//   let thingTheyAreSearchingFor = request.body;
  
//   // defining the first result
//   //console.log(thingTheyAreSearchingFor)
//   let titleArray = videoArray.forEach(title => {
//     return new Video(title);
//   })
//     console.log(title)
//     return thingTheyAreSearchingFor;
// });

const request = require('request');

const options = {
  method: 'GET',
  //   type: 'JSON',
  url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup',
  qs: {term: 'rambo', country: 'us'},
  headers: {
    'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
    'x-rapidapi-key': '38e058ddb8msh0ab4bb9902ac5b2p1d7aa3jsn10ae3807ccee'
  }

};

// function Video(obj){
//   this.name = obj.results[0].name;
//   this.picture = obj.results[0].picture;
//   this.locations = obj.results.locations[0].display_name;
//   this.providerIcon = obj.results.locations[0].icon;
//   this.urlProvider = obj.results.locations[0].url
//   this.favorite = false;
//   // videoArray.push(this);
//   // providerArray.push(this)
//   // console.log('Iam the name:', obj.name)
//   // console.log('I am the locations:', obj.locations)
// }

// app.get('/search', (request, response) => {
//   //request.query.search;
//   // let xyz = request.query.search
//   let dummyData = require('./test');
//   let testResults = JSON.parse(dummyData);
//   console.log(testResults)

//   //console.log(dummyData[0].results[0]);
//   let newVideoResult = testResults.map(result => {
//     return new Video(result)
    
//   })
//   response.render('./index.ejs', {bananas: newVideoResult})
//   console.log(newVideoResult)
  // response.render('./pages/books/show.ejs',{myBook : updResults.rows})

  ////TESTING GROUND
    // dummyData[0].results.forEach(result=>{
    //   new Video(result);
    //   console.log('I AM THE RESULT OBJECT', result)
    //   result.locations.forEach(provider=>{
    //    console.log('I AM THE PROVIDER OBJECT', provider)
        
    //   })
      //console.log('I am the providerArray', providerArray)
      //console.log(videoArray);
      // console.log('newSearch', newSearch)
      // let newProvider = new Video(result.locations);
    // });
    //console.log(videoArray)
    //console.log('I am all results', allResults.locations);
// });
//// TESTING GROUND
  // })
  // let i = 0
  // dummyData[i].results.locations.forEach((xyz) => {
  //   console.log(xyz)
  //   //obj.locations.forEach((provider) => {
  //     //console.log(provider)

  //   })
  // })
  


  // dummyData[0].results.forEach(title => {
  //     videoArray.push(new Video(title));
  // });
  // //response.status(200).json(videoArray);
  // console.log(videoArray);
// });




// let providerArray = [];

var videoArray = [];
function handleSearch (req, res){
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let allResults = JSON.parse(response.body);
    // console.log(body);
    //console.log('Im testing this:', allResults.results)
    // { id: '5d97da419a76a40056de285e',
    // picture:
    //  'https://utellyassets9-1.imgix.net/api/Images/318f8aad079414a1aee01e8ba8f67411/Redirect',
    // name: 'Rambo',
    // locations: [ [Object], [Object], [Object] ],
    // provider: 'iva',
    // weight: 0,
    // external_ids:
    //  { iva_rating: null,
    //    imdb: [Object],
    //    tmdb: [Object],
    //    wiki_data: [Object],
    //    iva: [Object],
    //    gracenote: null,
    //    rotten_tomatoes: null,
    //    facebook: null } }
    allResults.results.forEach(result=>{
      new Video(result);
      // console.log('I AM THE RESULT OBJECT', result)
      // result.locations.forEach(provider=>{
      //  //console.log('I AM THE PROVIDER OBJECT', provider)
        
      // })
      // console.log('I am the providerArray', providerArray)
      // console.log(videoArray);
      // console.log('newSearch', newSearch)
      // let newProvider = new Video(result.locations);
    });
    //console.log(videoArray)
    res.render('./index.ejs', {bananas: videoArray})
    //console.log('I am all results', allResults.locations);
})};

// locations:
// [ { icon:
//      'https://utellyassets7.imgix.net/locations_icons/utelly/black_new/GooglePlayIVAUS.png?w=92&auto=compress&app_version=f9bcb59f-f5b5-467d-bf1a-c16e9ed1ff81_eww2020-04-01',
//     display_name: 'Google Play',
//     name: 'GooglePlayIVAUS',
//     id: '5d8260b128fbcd0052aed197',
//     url:
//      'https://play.google.com/store/movies/details/Rambo_First_Blood_II?gl=US&hl=en&id=Vt4PyVlN5Ys' },
//   { icon:
//      'https://utellyassets7.imgix.net/locations_icons/utelly/black_new/iTunesIVAUS.png?w=92&auto=compress&app_version=f9bcb59f-f5b5-467d-bf1a-c16e9ed1ff81_eww2020-04-01',
//     display_name: 'iTunes',
//     name: 'iTunesIVAUS',
//     id: '5d80a9a5d51bef861d3740d3',
//     url:
//      'https://itunes.apple.com/us/movie/rambo-first-blood-part-ii/id552398029' },
//   { icon:
//      'https://utellyassets7.imgix.net/locations_icons/utelly/black_new/AmazonInstantVideoIVAUS.png?w=92&auto=compress&app_version=f9bcb59f-f5b5-467d-bf1a-c16e9ed1ff81_eww2020-04-01',
//     display_name: 'Amazon Instant Video',
//     name: 'AmazonInstantVideoIVAUS',
//     id: '5d82609332ac2f0051962fe6',
//     url:
//      'https://www.amazon.com/gp/product/B07XJ25DPT?creativeASIN=B07XJ25DPT&ie=UTF8&linkCode=xm2&tag=utellycom00-21' } ]


function Video(obj){
    this.name = obj.name;
    this.picture = obj.picture;
    this.locations = obj.locations[0].display_name
    this.providerIcon = obj.locations[0].icon;
    this.urlProvider = obj.locations[0].url
    this.favorite = false;
    videoArray.push(this);
    // providerArray.push(this)
    // console.log('Iam the name:', obj.name)
    // console.log('I am the locations:', obj.locations)
}

// Leave this code in here. Chance example 3/31
// function xyz(obj.locations) {
//   for (let i =0; i < obj.locations.length; i++){
//     let abc = [];
//     abc.push(arr[i].display_name)
//     console.log(abc)
//   }
//   return abc
// }
// Leave this code in here. Chance example 3/31
// this.locations = xyz(obj.locations)


// Turn everything on
// client.connect()
//     .then(() => {
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
});
// });
