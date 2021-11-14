const request = require('request-promise-native');

const fetchMyIP = function(callback) {
  //use this function to fetch the IP address
  return request('https://api.ipify.org/?format=json');
};

const fetchCoordsByIP = function(body) {
  const  ip = JSON.parse(body).ip;
  return request('https://api.freegeoip.app/json/?apikey=de1efd20-3e3d-11ec-9211-13342603d04d');
};

const flyOverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};


const nextTimes = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(flyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { fetchMyIP, fetchCoordsByIP, flyOverTimes, nextTimes};
