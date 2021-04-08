/* eslint-disable*/
export const degToCompass = (angle) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(angle / 45) % 8];
}

export const timeConverter = (timeStamp) => {
  const dateVal = new Date(timeStamp * 1000);
  const months = [
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

  const month = months[dateVal.getMonth()];
  const date = dateVal.getDate();
  const day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ][dateVal.getDay()];
  const time = { day, date: `${date} ${month}` };
  return time;
}

export const setAttributes = (el, attrs) => {
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

export const truncateTemp = (temp) => {
  const tempUnit = localStorage.getItem('temperatureUnit')
    ? localStorage.getItem('temperatureUnit')
    : 'C';
  const tempNoDecimal = Math.trunc(temp);

  return tempNoDecimal <= 9 && tempNoDecimal >= -9
    ? `${tempNoDecimal}°${tempUnit}`
    : `${tempNoDecimal}°`;
}

export const convertSpeed = (speed) => {
  const tempUnit = localStorage.getItem('temperatureUnit');
  if (tempUnit) {
    if (tempUnit === 'C') {
      return `${(speed * 3.6).toFixed(2)} km/h`;
    }
    return `${(speed * 2.237).toFixed(2)} mph`;
  }
  return `${(speed * 3.6).toFixed(2)} km/h`;
}

export const convertTemp = (temp) => {
  const tempUnit = localStorage.getItem('temperatureUnit');

  if (tempUnit) {
    if (tempUnit === 'C') {
      return temp - 273.15;
    }
    return ((temp - 273.15) * 9) / 5 + 32;
  }
  return temp - 273.15;
}
