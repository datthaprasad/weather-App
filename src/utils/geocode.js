const request = require('request')

const geocode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZHAtc2hldHR5IiwiYSI6ImNrc2VhaG9majB5ZzYybm9keWtmZ2ZvemYifQ.Z6UE0UUdiAEuPEaPoeFM5g&limit=1';

    request({ url, json: true }, (error, { body=undefined }) => {
     
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode