const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cors = require('cors');
const { title } = require('process');
const geoLocate = require('./utils/geoLocate');
const forecast = require('./utils/forecast');
const { log } = require('console');

const app = express();
const port = process.env.PORT || 3000;

//path definitions for express
const GenPATH = path.join(__dirname, '../public');
const VIEWPATH = path.join(__dirname, '../templates/views');
const PARTIALPATH = path.join(__dirname, '../templates/partials');

app.use(cors());

//setting hbs engine and locations
app.set('view engine', 'hbs');
app.set('views', VIEWPATH);
hbs.registerPartials(PARTIALPATH);

//setting static directory to serve
app.use(express.static(GenPATH));

// Middleware to set global variables
app.use((req, res, next) => {
    res.locals.lead = 'This is the footer!';
    res.locals.year = new Date().getFullYear();
    res.locals.author = 'Isaiah Andrew Mead';
    next();
});

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather from hbs file',
        name: 'Isaiah Mead'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Mead',
        name: 'Isaiah Mead'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Mead',
        name: 'Isaiah Mead',
        message: 'This is the help message'
    });
});


app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            err: 'No location was provided'
        })
    }

    geoLocate(address, (err, {city, latitude, longitude} = {}) => {
        if (err) {
            return res.send({
                error: err
            });
        };
                
        
        forecast(latitude, longitude, (err, foredata) => { 
            if (err) {
                return res.send({
                    error: err,
                });
            };

            const {weather, temp, min_temp, max_temp, humidity} = foredata;

            res.send({
                city,
                weather: weather.charAt(0).toUpperCase() + weather.slice(1),
                temp: `It is currently ${temp}º`,
                min_temp: `${min_temp}º`,
                max_temp: `${max_temp}º`,
                humidity: `Humidity at ${humidity}%`,
            });
        });
    });
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            err: 'No search parameters provided',
        });
    }

    console.log(req.query.search);
    
    res.send({
        products: [
            req.query.search,
        ]
    });
})

app.get('/help/*', (req, res) => {
    res.render('helperr', {
        title: '404',
        message: 'Help article not found!',
    });
})

app.get('*', (req, res) => {
    res.render('deferr', {
        title: '404',
        message: 'Invalid URL. Page not found!',
    });
})



app.listen(port, () => {
    log('Server is up and running');
    log(`${port}`);
})
