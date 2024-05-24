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
    const abbreviations = await prisma.simpleAF.findMany({
    orderBy: [
          {
            abbreviation_id: 'desc'
          }
        ]
      });
      console.log(abbreviations);

      // Render the homepage with all the abbreviations
      res.render('pages/home', { abbreviations: abbreviations });
      } catch (error) {
      // Handle errors
      console.error("Error:", error);
      res.render('pages/home', { error: "An error occurred while fetching abbreviations." });
    }
  });

// Search for abbreviation
app.get('/fetch-data', async function(req, res) {

// Get search input 
const { SearchInput } = req.query; // Use req.query for GET requests to access query parameters
    
    // Check if search input is provided
    if (!SearchInput) {
      console.log("Search input is empty");
      // Render an error page or redirect to a different route
      // return res.render('pages/error', { error: "Please enter a search query." });
      return res.json([])
    }
    
    // Your logic for fetching data based on the search input
    const searchResults = await prisma.simpleAF.findMany ({
    abbreviation: 'searchInput'
    })
    // Render a page to display the search results
    // res.render('pages/searchResults', { results: searchResults });
    return res.json(searchResults)
  });

app.listen(8080);