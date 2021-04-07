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
        // when no city was fond api response
        // with object containing err message
        if (!geoLocation.error) {
          Weather.getWeatherData({
            latitude: geoLocation.latt,
            longitude: geoLocation.longt,
          }).then((weatherData) => {
            // store weatherData to use when toggling between temp units
            weatherController.storedWeatherData = weatherData;

            View.displayWeather(weatherData);
            View.updateCityName(`${queryString}, ${geoLocation.standard.prov}`);
          });
        } else {
          // if no city was found
          const errorMessage = geoLocation.error.hasOwnProperty('description')
            ? geoLocation.error.description
            : geoLocation.error.hasOwnProperty('message')
            ? geoLocation.error.message
            : 'Oopsie Woopsie!';

          swal('', `${errorMessage}`, 'error');
        }
      })
      .then(() => {
        //reactivate find button
        selectors.findButton.forEach((button) => {
          button.innerHTML = 'Find';
          button.disabled = false;
        });
      })
      .catch((err) => {
        swal('', `${err}`, 'error');
      });
  },
  domListeners: {
    onLoadListener: function () {
      // mitigate the short un-styled content
      // that flashes when the page load for the first time
      // before the js inject the styling into the header
      document.querySelector('body').style.display = 'block';

      const positionAccessGranted = function (location) {
        Promise.all([
          Weather.getWeatherData(location.coords),
          GeoLocation.getCityNameFromLatLon(location.coords),
        ])
          .then(([weatherData, geoLocationData]) => {
            if (!geoLocationData.error) {
              // store weatherData to use when toggling between temp units
              weatherController.storedWeatherData = weatherData;

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
          // store weatherData to use when toggling between temp units
          weatherController.storedWeatherData = weatherData;

          View.displayWeather(weatherData);
          View.updateCityName('Vancouver');
        });
      };

      // if user grant location access
      // show curr location forecast
      // else show new york's forecast
      navigator.geolocation.getCurrentPosition(
        positionAccessGranted,
        positionAccessDenied
      );

      // select the current temp
      if (localStorage.getItem('temperatureUnit')) {
        if (localStorage.getItem('temperatureUnit') == 'F') {
          selectors.fahrenheitBtn.classList.add('is-hovered');
          selectors.celsiusBtn.classList.remove('is-hovered');
        }
      }
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
        const formInput = [...form.children][0];
        
        const queryString = formInput.value.trim();

        // test for potential wrong city names
        // if test false add is-invalid flag to input
        //else remove it if exist
        if (cityNameRegExp.test(queryString)) {
          formInput.classList.remove('is-invalid');

          //deactivate find button to prevent
          //flooding api with multiple requests
          selectors.findButton.forEach((button) => {
            const image = document.createElement('img');
            helper.setAttributes(image, {
              src: 'https://media.giphy.com/media/Jku35TGjTmC0YAWsbb/giphy.gif',
              width: '25',
              height: '25',
            });
            button.innerHTML = '';
            button.appendChild(image);
            button.disabled = true;
          });

          //get request weather data
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

// get current location of the user on load
window.addEventListener('load', weatherController.domListeners.onLoadListener);

// validity for nav bar form

selectors.locationForm.forEach((form) => {
  form.addEventListener('submit', weatherController.domListeners.onFormSubmit);
});

// Second attempt to make the submit works, without success:

const newCity = document.getElementById("location");

const submitCity = (e) => {
  e.preventDefault();
  const city = newCity.value
  if (city === null || city === "") {
    return;
  } else {
    weatherController.getLocationAndWeather(city);
  }
  newCity.value = null;
}

newCity.addEventListener("submit", submitCity);

// toggle displaying the data in Fahrenheit or Celsius.

selectors.todayCard.addEventListener(
  'click',
  weatherController.domListeners.switchTemp
);

