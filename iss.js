const request = require("request");
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  const ipURL = 'https://api64.ipify.org?format=json';
  // use request to fetch IP address from JSON API
  request(ipURL, (error,response,body) => {
    const data = JSON.parse(body);
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    callback(null, data.ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const ipCoordAPI = "http://ipwho.is/";
  request(ipCoordAPI + ip, (error, response, body) => {
    const data = JSON.parse(body);
    let latlongObj = {};
    
    if (!data.success) {
      const msg = `Success status was ${data.success}. Server message: ${data.message} for IP ${data.ip}.`;
      callback(Error(msg), null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }


    latlongObj["latitude"] = data.latitude;
    latlongObj["longitude"] = data.longitude;
    console.log(latlongObj);
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const lat = "?lat=" + coords.latitude;
  const longi = "&lon=" + coords.latitude;
  const issAPI = "https://iss-flyover.herokuapp.com/json/" + lat + longi;
  request(issAPI, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching FlyOverTimes. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const parsedbody = JSON.parse(body);

    if (parsedbody.message !== 'success') {
      const msg = `Retrieval status unsuccesful. Message: ${parsedbody.message}`;
      callback(Error(msg), null);
      return;
    }
    
    callback(null, parsedbody.response);
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
