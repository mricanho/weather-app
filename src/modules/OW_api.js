const weatherAPIKey = '353ef5d85952112199e4f55400bcd4c2';

export default class Weather {
  static async getWeatherData({ latitude, longitude }) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,alerts&appid=${weatherAPIKey}`;
    const rowWeatherData = await fetch(url);
    const parsedWeatherData = await rowWeatherData.json();
    /* console.log(rowWeatherData); */
/*     console.log(parsedWeatherData) */
    return parsedWeatherData;
  }
}