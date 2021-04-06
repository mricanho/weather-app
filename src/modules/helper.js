
export function degToCompass(angle) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(angle / 45) % 8];
}

export function timeConverter(UNIX_timestamp) {
  let dateVal = new Date(UNIX_timestamp * 1000);
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  let month = months[dateVal.getMonth()];
  let date = dateVal.getDate();
  let day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][dateVal.getDay()];
  let time = { day: day, date: `${date} ${month}` };
  return time;
}

// set multiple attributes of a dom element
export function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// remove decimal part of temp
// add The degree char when temp is smaller then 10
export function truncateTemp(temp) {
  const tempUnit = localStorage.getItem('temperatureUnit')
    ? localStorage.getItem('temperatureUnit')
    : 'C';
  const tempNoDecimal = Math.trunc(temp);

  return tempNoDecimal <= 9 && tempNoDecimal >= -9
    ? tempNoDecimal + '°' + tempUnit
    : tempNoDecimal + '°';
}

// convert wind speed
export function convertSpeed(speed) {
  const tempUnit = localStorage.getItem('temperatureUnit');

  // if temperatureUnit does not exist default to metric
  if (tempUnit) {
    if (tempUnit == 'C') {
      return (speed * 3.6).toFixed(2) + ' km/h';
    } else {
      return (speed * 2.237).toFixed(2) + ' mph';
    }
  } else {
    return (speed * 3.6).toFixed(2) + ' km/h';
  }
}


export function convertTemp(temp) {
  const tempUnit = localStorage.getItem('temperatureUnit');

  if (tempUnit) {
    if (tempUnit == 'C') {
      return temp - 273.15;
    } else {
      return ((temp - 273.15) * 9) / 5 + 32;
    }
  } else {
    return temp - 273.15;
  }
}
