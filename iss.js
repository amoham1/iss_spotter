const request = require('request');

const fetchMyIP = function(callback) {
  //use this function to fetch the IP address
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
  
};

const fetchCoordsByIP =  function(ip, callback) {
//This function should fetch the geo coordinates by using the ip
  request('https://api.freegeoip.app/json/?apikey=de1efd20-3e3d-11ec-9211-13342603d04d', (error, response, body)=> {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching the coordinates for IP ${body}`), null);
      return;
    }

    const {latitude, longitude } = JSON.parse(body);

    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTime = function(Obj, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${Obj.latitude}&lon=${Obj.longitude}`;
  request(url, (error, response, body) =>{
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code: ${response.statusCode} when fetching pass over times ${body}`), null);
      return;
    }
    const passOver = JSON.parse(body).response;
    callback(null, passOver);
  });

};

const nextIssTimes = function(callback) {
 
  fetchMyIP((error, ip) =>{
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTime(loc, (error, nextPass) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPass);
      });
    });
  });
};

module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTime, nextIssTimes};








