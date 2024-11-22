
const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const msgElem1 = document.querySelector('#msg1');
const msgElem2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = searchInput.value;

    msgElem1.textContent = 'loading weather...';
    msgElem2.textContent = '';

    if(!location) return msgElem1.textContent = 'No location was provided';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=11134321c95c0af259d50c39fa2a796d&units=metric`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            msgElem1.textContent = data.message.charAt(0).toUpperCase() + data.message.slice(1);
        } else {
            msgElem1.textContent = data.name + " " + data.sys.country;
            msgElem2.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1) + ". It is currently " + data.main.temp + "°";
        }
    })
    .catch(err => {
        msgElem1.textContent = err
    });
});




