const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')

const path = require('path');  // Import the 'path' module

const app = express();


mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
})

// // Set the view engine and views directory
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
// app.set('views', path.join(__dirname, 'views'));  // Assuming this file is in the root of your project

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
    // res.render('index');
});


app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
  
    res.redirect('/')
  })
  
  app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })








app.listen(process.env.PORT || 5000);

