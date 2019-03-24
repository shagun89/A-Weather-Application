const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/67087511539341e405d60c39e936c55e/' + lat + ',' + long + '?units=si'
    request({ url: url, json: true}, (error, response) => {
        if(error)
            callback("Unable to connect to weather services", undefined)
        else if(response.body.error)    
            callback(response.body.error,undefined)
        else 
            callback(undefined, 
                    response.body.daily.data[0].summary + " It is currently "+ response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain.")
    })
}

module.exports = forecast