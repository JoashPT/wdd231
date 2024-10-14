
const weatherKey = "c6c5c073035fcc3afff157ecfa5cdd85";
const weatherLat = "49.75";
const weatherLong = "6.63";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${weatherLat}&lon=${weatherLong}&units=metric&appid=${weatherKey}`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = response.json();
            return data;
        } else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

//select weather elements
const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const figcaption = document.querySelector('figcaption');

function displayResults() {
    apiFetch().then(data => {
        currentTemp.innerHTML = `${data.main.temp}&deg;C`;
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        let desc = data.weather[0].description;
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', desc);
        figcaption.textContent = `${desc}`;
    })
}
displayResults();

