// Needed for dotenv
require("dotenv").config();

// Needed for Express
const express = require('express');
const app = express();

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


// Rooting the homepage
app.get('/', async function(req, res) {   

  // Try-Catch for any errors
  try {
    // Get all abbreviations
    const abbreviations = await prisma.SimpleAF.findMany({
    orderBy: [
          {
            abbreviation_id: 'desc'
          }
        ]
      });
      // console.log(abbreviations);

      // Render the homepage with all the abbreviations
      res.render('pages/home', { abbreviations: abbreviations });
      } catch (error) {
      // Handle errors
      res.render('pages/home', { error: "An error occurred while fetching abbreviations." });
      // console.log(error);
    }
  });

  // Route to render the search form
  app.get('/search', (req, res) => {
  res.render('search');
  });

// Route to handle form submission and search query
app.post('/search', async (req, res) => {
  const searchInput = req.body.searchInput; // Extract search input from request body
  try {
    const searchResults = await prisma.simpleAF.findMany({
      where: {
        OR: [
          { abbreviation: { contains: searchInput, mode: 'insensitive' } },
          { meaning: { contains: searchInput, mode: 'insensitive' } },
          { keywords: { contains: searchInput, mode: 'insensitive' } },
          { context: { contains: searchInput, mode: 'insensitive' } }
        ]
      }
    });
    res.render('pages/home', { results: searchResults });
    console.log(searchInput)
    console.log (searchResults)
    } catch (error) {
    console.error('Error searching for data:', error);
    res.status(500).send('Search Result Error');
  }
});


app.listen(8080);