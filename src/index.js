import Weather from './modules/OW_api';

const vancouverCoordinates = {
  latitude: 49.24847,
  longitude: -123.10299,
};

function hello() {
  console.log('hello');
}

const weatherNow = Weather.getWeatherData(vancouverCoordinates);
function printWeather() {
  console.log({ weatherNow });
}
hello();
printWeather();