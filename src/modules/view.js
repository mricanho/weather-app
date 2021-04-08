import * as selectors from './selectors';
import * as helper from './helper';

export default class View {
  static displayWeather(weatherDate) {
    const date = helper.timeConverter(weatherDate.current.dt);

    const convertedCurrentTemp = helper.convertTemp(
      weatherDate.current.temp,
    );
    selectors.todayTemp.textContent = helper.truncateTemp(
      convertedCurrentTemp,
    );

    selectors.todayCondition.textContent = weatherDate.current.weather[0].description;

    selectors.todayHumidity.textContent = `${weatherDate.current.humidity} %`;

    selectors.todayWindDirection.textContent = helper.degToCompass(
      weatherDate.current.wind_deg,
    );

    selectors.todayName.textContent = date.day;
    selectors.todayDate.textContent = date.date;

    const conditionText = document.getElementById("condition");
    const conditionGif = document.getElementById("temp-icon")

    if (conditionText.innerHTML.indexOf("clouds") != -1) {
      conditionGif.src = ("https://media.giphy.com/media/fqVKfHAc7QOCnXRmHY/giphy.gif");
    } else if (conditionText.innerHTML.indexOf("clear") != -1) {
      conditionGif.src = ("https://media.giphy.com/media/MY6krcVK50sWsCakAp/giphy.gif");
    } else if (conditionText.innerHTML.indexOf("drizzle") != -1) {
      conditionGif.src = ("https://media.giphy.com/media/R761lRtHcXuRQgF1Pf/giphy.gif");
    } else if (conditionText.innerHTML.indexOf("rain") != -1) {
      conditionGif.src = ("https://media.giphy.com/media/kBfL5cuu4bj4rr6GN8/giphy.gif");
    } else if (conditionText.innerHTML.indexOf("snow") != -1) {
      conditionGif.src = ("https://media.giphy.com/media/tIHktzgRi8yjIplFVI/giphy.gif");
    } else {
      conditionGif.src = ("https://media.giphy.com/media/h8OVffxQIVXWM2pwG4/giphy.gif");
    }
  }

  static updateCityName(geoLocationData) {
    if (typeof geoLocationData === 'string') {
      selectors.todayCityName.textContent = geoLocationData;
    } else {
      selectors.todayCityName.textContent = `${geoLocationData.osmtags.name_en}, ${geoLocationData.prov}`;
    }
  }
}
