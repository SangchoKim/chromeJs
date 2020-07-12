const weather = document.querySelector('.js-weather');

const COORDS = 'coords';
const API_KEY = '021f7be3676b52330b191a03cf709700';

function getWeather (lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(res){
        return res.json()
    })
    .then(function(res){
        const temperature = res.main.temp;
        const place = res.name;
        weather.innerText = `${temperature}도 @${place}`
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS , JSON.stringify(coordsObj));
}

function handleGeoSucces(postion){
    const latitue = postion.coords.latitude;
    const longitude = postion.coords.longitude;
    const coordsObj = {
        latitue,longitude
    }
    saveCoords(coordsObj);
    getWeather(latitue,longitude);
}
function handleGeoError(){
    console.log('handleGeoError');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    }else{
        const {latitue, longitude} = JSON.parse(loadedCords);
        getWeather(latitue, longitude);
    }
}

function init () {
    loadCoords();
};

init();