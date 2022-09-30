const request = require("request");
const { fetchMyIP } = require("./iss");
const { fetchCoordsByIP } = require("./iss");
const { fetchISSFlyOverTimes } = require("./iss");
const coords = { latitude: 49.1665898, longitude: -123.133569 };
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  
  printPassTimes(passTimes);
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds`);
  }
};
 
// let ip;

// fetchMyIP((error, ipaddress) => {
//   if (error) {
//     console.log('Error details: ', error);
//     return;
//   }
  
//   ip = ipaddress;
//   return;
// });

// fetchCoordsByIP('70.79.227.53', (error, data) => {
//   console.log('Error: ', error);
//   console.log("Data: ", data);
// })

// fetchISSFlyOverTimes(coords, (error, data) => {
//   console.log('Error: ', error);
//   console.log("Flyover times: ", data);
// });


