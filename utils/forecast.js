const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1cc49bed160877460d1977016029cdd8/' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            const temperature = ((parseFloat(body.currently.temperature) - 32)*5/9).toFixed(2)
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + temperature.toString() + ' degrees out.')
        }
    })

}

module.exports = forecast