// Needed for dotenv
require("dotenv").config();

// Needed for Express
var express = require('express')
var app = express()

// Needed for EJS
app.set('view engine', 'ejs');

// Needed for public directory
app.use(express.static(__dirname + '/public'));

// Needed for parsing form data
app.use(express.json());       
app.use(express.urlencoded({extended: true}));

// Needed for Prisma to connect to database
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

// Homepage
app.get('/', async function(req, res) {   
  
  // Try-Catch for any errors
  try {

  // Get all abbreviations
  const abbreviations = await prisma.simpleAF.findMany({
          orderBy: [
            {
              abbreviation_id: 'desc'
            }
          ]
  });
  console.log(abbreviations);

  // Render the homepage with all the abbreviations
  await res.render('pages/home', { abbreviations: abbreviations });
  } catch (error) {
  res.render('pages/home');
  console.log(error);
  } });

  
  // Redirect back to home
  res.redirect('/');
  } catch (error) {
  console.log(error);
  res.redirect('/');
    }
  });

app.listen(8080); // dont delete this