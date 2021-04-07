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

/*     selectors.todayConditionIcon.src = require(`../img/icons/${
      weatherDate.current.weather[0].icon.substring(0, 2)
    }.svg`); */

    selectors.todayCondition.textContent = weatherDate.current.condition;

    selectors.todayHumidity.textContent = `${weatherDate.current.humidity} %`;

    selectors.todayWindDirection.textContent = helper.degToCompass(
      weatherDate.current.wind_deg,
    );

    /* selectors.todayWindSpeed.textContent = helper.convertSpeed(
      weatherDate.current.wind_speed,
    ); */
    // weatherDate.current.wind_speed + ' km/h';

    selectors.todayName.textContent = date.day;
    selectors.todayDate.textContent = date.date;

    // api daily arr contain 8 day,
    // only need 7 so setting the max index to 7
    /* const tempUnit = localStorage.getItem('temperatureUnit')
      ? localStorage.getItem('temperatureUnit')
      : 'C'; */
 /*    for (let index = 1; index < 7; index += 1) {
      const day = weatherDate.daily[index];
      const date = helper.timeConverter(day.dt);

      selectors[`day_${index}_date`].textContent = date.day; */

  /*     selectors[`day_${index}_icon`].src = require(`../img/icons/${
        day.weather[0].icon.substring(0, 2)
      }.svg`); */

 /*      const truncatedMaxTemp = Math.trunc(
        helper.convertTemp(day.temp.max),
      );
      selectors[`day_${index}_maxTemp`].textContent = `${truncatedMaxTemp}°${tempUnit}`;

      const truncatedMinTemp = Math.trunc(
        helper.convertTemp(day.temp.min),
      );
      selectors[`day_${index}_minTemp`].textContent = `${truncatedMinTemp}°${tempUnit}`;
    }
 */
    /* if (selectors.mainWeatherSection.classList.contains('is-hidden')) {
      selectors.loadingPageAnimation.classList.add('is-hidden');

      selectors.mainWeatherSection.classList.remove('is-hidden');
      selectors.mainWeatherSection.classList.add('scale-in-center');
      setTimeout(() => {
        selectors.mainWeatherSection.classList.remove(
          'scale-in-center',
        );
      }, 1000);
    } */
  }

  static updateCityName(geoLocationData) {
    // if city name was passed as string or as object from api service
    if (typeof geoLocationData === 'string') {
      selectors.todayCityName.textContent = geoLocationData;
    } else {
      selectors.todayCityName.textContent = `${geoLocationData.osmtags.name_en}, ${geoLocationData.prov}`;
    }
  }
}
