export default class GeoLocation {
  static getCityNameFromLatLon({ latitude, longitude }) {
    const url = `https://geocode.xyz/${latitude},${longitude}?json=1`;
    return fetch(url)
      .then((rowGeoData) => rowGeoData.json())
      .then((parsedGeoData) => parsedGeoData);
  }

  static getLatLonFromCityName(cityName) {
    const url = `https://geocode.xyz/${cityName}?json=1`;
    return fetch(url)
      .then((rowGeoData) => rowGeoData.json())
      .then((parsedGeoData) => parsedGeoData);
  }
}
