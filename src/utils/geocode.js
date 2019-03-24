const request = require('request')


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1Ijoic2hhZ2d5ODkiLCJhIjoiY2p0andhbmluMHhxbDQ5bHFjOWl0djNjMCJ9.VuwhjSaZ5Nm8owjdBzw0bg"
    //console.log(url)
    request({ url: url, json : true}, (error, response) => {
        
        if(error)
            callback("Unable to connect to location services", undefined)
        else if(response.body.features.length === 0)    
            callback("Invalid search location", undefined)
        else {
            callback(undefined, {
                latitude : response.body.features[0].center[0],
                longitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
            
        }
                
    })
}

module.exports = geocode