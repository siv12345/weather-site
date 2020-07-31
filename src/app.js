const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const hbs = require('hbs');

// define pathes for express config
const app = express()
const publicdirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// line which sets up handlebar
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicdirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Siva Surya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'Siva Surya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: "Siva Surya",
        helpString: 'This is a sample error message which is used for testing this app'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "please provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: "help page not found",
        name: 'Siva Surya',
        errorText: "help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: "page not found",
        name: "Siva Surya",
        errorText: "the requested page is not found"
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})