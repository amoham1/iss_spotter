const { fetchMyIP } = require('./iss');
const {fetchCoordsByIP} = require('./iss');
const {fetchISSFlyOverTime} = require('./iss');
const {nextIssTimes} = require('./iss');
// const url = require('./iss')

fetchMyIP((error, ip) => {
  if (error) {
    console.log("Ip not found", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
});


fetchCoordsByIP('99.230.140.172', (error, coordinates) => {
  if (error) {
    console.log(`It didn't work, ${error}`);
    return;
  }
  console.log('It worked! Returned coordinates', coordinates);
});

const cordz = {latitude: '43.6657', longitude: '-79.3718' };

fetchISSFlyOverTime(cordz, (error, passTimes)=>{
  if (error) {
    console.log(`It didn't work :( ${error})`);
    return;
  }
  console.log(`It worked! Here are the returned pass over times:`);
  console.table(passTimes);
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextIssTimes((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});