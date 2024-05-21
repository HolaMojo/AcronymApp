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

app.get('/demo', async function(req, res) {

    var abbreviations = await prisma.post.findMany();
  
    console.log(abbreviations);
  
    await res.render('pages/demo', { abbreviations: abbreviations });
  });
  