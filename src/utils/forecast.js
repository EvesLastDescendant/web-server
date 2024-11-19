const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=11134321c95c0af259d50c39fa2a796d&units=metric`;

    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback(err);
        } else if (body.cod === '404') {
            callback(body.message);
        } else {
            callback(null, {
                city: body.name,
                temp: body.main.temp,
                humidity: body.main.humidity,
                min_temp: body.main.temp_min,
                max_temp: body.main.temp_max,
                weather: body.weather[0].description
            });
        };
    });
};

module.exports = forecast;