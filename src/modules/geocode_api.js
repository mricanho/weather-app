export default class GeoLocation {
  // get city from geolocation coordinates
  static getCityNameFromLatLon({ latitude, longitude }) {
    const url = `https://geocode.xyz/${latitude},${longitude}?json=1`;
    return fetch(url)
      .then((rowGeoData) => {
        return rowGeoData.json();
      })
      .then((parsedGeoData) => {
        return parsedGeoData;
      });
  }

  // get geoLocation coordinates from city name
  static getLatLonFromCityName(cityName) {
    const url = `https://geocode.xyz/${cityName}?json=1`;
    return fetch(url)
      .then((rowGeoData) => rowGeoData.json())
      .then((parsedGeoData) => parsedGeoData);
  }
}
