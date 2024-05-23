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

// Rooting the homepage
app.get('/home', async function(req, res) {   
  res.render ('pages/home');

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
  } 





// New form page
app.get('/new', function(req, res) {
res.render('pages/new');
});

// Create a new abbreviation
app.post('/new', async function(req, res) {
    
  // Try-Catch for any errors
  try {
      // Get the title and content from submitted form
      const { abbreviation, meaning, keywords, context, email_for_questions } = req.body;
  
  // Reload page if empty title or content
  if (!abbreviation || !meaning || !keywords || !context || !email_for_questions ) {
  console.log("Unable to create new abbreviation, missing information");
  res.render('pages/new');
} else {

  // Create abbreviation and store in database
  const blog = await prisma.simpleAF.create({
      data: { abbreviation, meaning, keywords, context, email_for_questions },
  });

  // Redirect back to the homepage
  res.redirect('/');
}
} catch (error) {
  console.log(error);
  res.render('pages/new');
}

});

});

app.listen(8080); // dont delete this