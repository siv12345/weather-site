const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dad00b0b2355958f8ff91822fcc4c3a8&query=' + lat + ',' + lon
    // + '&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('No internet connection', undefined)
        } else if (body.error) {
           callback('unable to find location', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] +  '. It is currently ' + body.current.temperature + ' But it feels like ' + body.current.feelslike)
        }
    })
}


module.exports = forecast