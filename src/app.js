const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Shaggy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Myself',
        name : 'Shaggy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Save me!!',
        title: 'Help',
        name : 'Shaggy'        
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : "Please provide the search term!!"
        })
    }
    const loc = req.query.search
    geocode(loc, (error, {latitude, longitude, location} = {}) =>{
        if(error)
        {
            return res.send({
                error: error
            })
        }
        forecast(longitude, latitude, (error, forecastdata) => {
            if(error)
            {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast : forecastdata,
                location,
                address : req.query.search
            })
            
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMsg : 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMsg : 'Page 404 error'
    })
})

app.listen(3000, () => {
    console.log('Server is up running on port 3000')
})