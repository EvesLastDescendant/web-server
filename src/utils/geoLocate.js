const request = require('request'); 

const geoLocate = (address, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(address)}&appid=11134321c95c0af259d50c39fa2a796d&units=metric`;

    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback(err);
        } else if (body.cod === '404') {
            callback(body.message);
        } else {
            callback(null, {
                city: body.name,
                latitude: body.coord.lat,
                longitude: body.coord.lon
            });
        }
    })
}

module.exports = geoLocate;