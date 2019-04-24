const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFzaHQiLCJhIjoiY2p1bDh2aHYwMGkyejQ0cHdsY2gzZ3hiZyJ9.omOp-6HvRq6hCJkr_HJDGg'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location service!", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined)
        } else {

            data = {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place: body.features[0].place_name
            }
        
            callback(undefined, data)
        }
    })
}

module.exports = geocode