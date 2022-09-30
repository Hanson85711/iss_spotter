const request = require("request");
const { fetchMyIP } = require("./iss");
const { fetchCoordsByIP } = require("./iss");
const { fetchISSFlyOverTimes } = require("./iss");
const coords = { latitude: 49.1665898, longitude: -123.133569 };

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


