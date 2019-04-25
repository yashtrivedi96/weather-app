const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 80

app.get('', (req, res) => {
    res.send("home page")
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    const address = req.query.address
    geocode(address, (error, { latitude, longitude, place }) => {
        if (error) {
            return res({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res({
                    error: error
                })
            }

            res.send({
                forecast: data,
                location: place,
                address: address
            })
        })
    })

    
})


app.listen(port, () => {
    console.log("Running on port " + 80)
})