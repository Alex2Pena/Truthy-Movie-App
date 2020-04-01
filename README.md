# 301-final-project - TEAM REST - "Truty Movie"

### Team members
 - Alex Pedersen. AKA "A1", AKA "AJAX", formerly known as "JSON"
 - Alex Pena. AKA "A2" AKA "JSON", formerly known as "AJAX"
 - Jesse Pena. 
 - Corey DeJong.

### Project Description
 - Application that allows a user to search for movies and t.v. shows to provide results through multiple streaming providers.

### Problem Domain
 - Users are not able to efficiently know where movies and t.v. shows are available and through which provider.
 - Potential to save money on knowing where you can get content for free/cheaper​
 - Saves time searching for movies

### Semantic versioning
 - Version 1.0 - MVP

### Libraries
 - ***A list of any libraries, frameworks, or packages that your application requires in order to properly function
 -  "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "ejs": "^3.0.1",
    "express": "^4.17.1",
    "method-override": "^3.0.0",
    "pg": "^7.18.2",
    "request": "^2.88.2",
    "superagent": "^5.2.2"

### Installation Instructions    
 - *** Instructions that the user may need to follow in order to get your application up and running on their own computer
 - In your own terminal, in the location of your pleasure, type "git clone https://github.com/Alex2Pena/Truthy-Movie-App"
 - In your terminal, enter "cd 301-final-project"
 - In your terminal, enter "code ."
 - In your terminal, enter "npm init y"
 - In your terminal, enter "npm i -S"
 - In your terminal, enter "pg start"
 - In your terminal, enter "cd data"
 - In your terminal, enter "psql -f schema.sql -d item"
 - create a ".env" file
 - in the ".env" file, enter "PORT=3000"
 - In the ".env" file, enter "UTELY_API_KEY=38e058ddb8msh0ab4bb9902ac5b2p1d7aa3jsn10ae3807ccee"

 For Windows Users:
 - in the ".env" file, enter DATABASE_URL=postgres://
 - for windows users, immediately following the previous command, add your user name and password, seperated with a colon
 - immediately following add "@localhost:5432/item"

 For Mac Users:
 - something about brew?


 - In your terminal, enter "nodemon"
 - In your web browser, enter "http://localhost:3000/" in the url.
 - have "fun"!



Clearly defined API endpoints with sample responses

Clearly defined database schemas
