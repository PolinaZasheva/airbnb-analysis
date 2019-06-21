//PROJECT
//CREATING A HEATMAP

// Create the map with our layers
var map = L.map("map", {
  center: [41.894000, -87.631322],
  zoom: 13,
  });

// Adding tile layer aka laying the ground work
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
}).addTo(map);

d3.csv("data/listings.csv", function(err, response) {
if (err) throw err;

var heatArray = [];

// Loop through data
for (var i = 0; i < response.length; i++) {
  // Set the data location property to a variable   
  var location = response[i].lat_long
  // Check for location property
  if (location) {
    // Add a new marker to the cluster group and bind a pop-up
    heatArray.push([response[i].latitude, response[i].longitude]);
  }
}  
  // console.log(response[i].latitude, response[i].longitude)
 console.log(heatArray[0,1000])

var heat = L.heatLayer(heatArray, .2, {
  radius: 20,
  blur: 35
}).addTo(map);
});
