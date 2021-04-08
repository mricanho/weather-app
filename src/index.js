import Weather from './modules/OW_api';
import View from './modules/view';
import * as selectors from './modules/selectors';
import GeoLocation from './modules/geocode_api';
import * as helper from './modules/helper';
import swal from 'sweetalert';

const weatherController = {
  storedWeatherData: null,
  getLocationAndWeather: function (queryString) {
    GeoLocation.getLatLonFromCityName(queryString)
      .then((geoLocation) => {
        if (!geoLocation.error) {
          Weather.getWeatherData({
            latitude: geoLocation.latt,
            longitude: geoLocation.longt,
          }).then((weatherData) => {
            weatherController.storedWeatherData = weatherData;

            console.log(weatherData);

            View.displayWeather(weatherData);
            View.updateCityName(`${queryString}, ${geoLocation.standard.prov}`);
          });
        } else {
          const errorMessage = geoLocation.error.hasOwnProperty('description')
            ? geoLocation.error.description
            : geoLocation.error.hasOwnProperty('message')
            ? geoLocation.error.message
            : 'Oopsie Woopsie!';

          swal('', `${errorMessage}`, 'error');
        }
      })
      .then(() => {
        selectors.findButton.classList.remove("is-loading");
      })
      .catch((err) => {
        swal('', `${err}`, 'error');
      });
  },
  domListeners: {
    onLoadListener: function () {

      document.querySelector('body').style.display = 'block';

      const positionAccessGranted = function (location) {
        Promise.all([
          Weather.getWeatherData(location.coords),
          GeoLocation.getCityNameFromLatLon(location.coords),
        ])
          .then(([weatherData, geoLocationData]) => {
            if (!geoLocationData.error) {

              weatherController.storedWeatherData = weatherData;

              console.log("second log " + weatherData);

              View.displayWeather(weatherData);
              View.updateCityName(geoLocationData);
            } else {
              const errorMessage = geoLocationData.error.hasOwnProperty(
                'description'
              )
                ? geoLocationData.error.description
                : geoLocationData.error.hasOwnProperty('message')
                ? geoLocationData.error.message
                : 'Oopsie Woopsie!';

              swal('', `${errorMessage}`, 'error');
            }
          })
          .catch((err) => {
            swal('', `${err}`, 'error');
          });
      };

      const positionAccessDenied = function () {
        const vancouverCoordinate = {
          latitude: 49.2497,
          longitude: -123.1193,
        };
        Weather.getWeatherData(vancouverCoordinate).then((weatherData) => {

          weatherController.storedWeatherData = weatherData;

          console.log("third log "+weatherData)

          View.displayWeather(weatherData);
          View.updateCityName('Vancouver');
        });
      };

      navigator.geolocation.getCurrentPosition(
        positionAccessGranted,
        positionAccessDenied
      );
    },

    onFormSubmit: function (event) {
      event.preventDefault();
      const form = event.target;

      if (form.checkValidity() === false) {
        event.stopPropagation();
        form.classList.add('was-validated');
      } else {
        form.classList.remove('was-validated');

        const cityNameRegExp = RegExp(
          `^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$`
        );
        const formInput = document.getElementById('location');
        
        const queryString = formInput.value;

        if (cityNameRegExp.test(queryString)) {
          formInput.classList.remove('is-invalid');

          selectors.findButton.classList.add("is-loading");

          weatherController.getLocationAndWeather(queryString);
        } else {
          formInput.classList.add('is-invalid');
        }
      }
    },

    switchTemp: function (event) {
      if (event.target.closest('#celsius')) {
        localStorage.setItem('temperatureUnit', 'C');

        weatherController.storedWeatherData
          ? View.displayWeather(weatherController.storedWeatherData)
          : undefined;
      } else if (event.target.closest('#fahrenheit')) {
        localStorage.setItem('temperatureUnit', 'F');

        weatherController.storedWeatherData
          ? View.displayWeather(weatherController.storedWeatherData)
          : undefined;
      }
    },
  },
};

window.addEventListener('load', weatherController.domListeners.onLoadListener);

selectors.locationForm.forEach((form) => {
  form.addEventListener('submit', weatherController.domListeners.onFormSubmit);
});

selectors.todayCard.addEventListener(
  'click',
  weatherController.domListeners.switchTemp
);

