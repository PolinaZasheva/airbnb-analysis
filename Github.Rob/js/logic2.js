//PROJECT
//THIS IS FOR THE DATA CLUSTER MAP
d3.csv("../data/listings.csv", function(err, review_data) {
    if (err) throw err;
       
  // parse data
    review_data.forEach(function(data) {
      data.review_scores_rating = data.review_scores_rating;
  
    console.log(data.review_scores_rating);
  
  });
  });

  // Adding tile layer aka laying the ground work
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  });
  
// Initialize all of the LayerGroups we'll be using. We want to be able to filter by ratings
var layers = {
  One_Star: new L.LayerGroup(),
  Two_Stars: new L.LayerGroup(),
  Three_Stars: new L.LayerGroup(),
  Four_Stars: new L.LayerGroup(),
  Five_Stars: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("map", {
  center: [41.894000, -87.631322],
  zoom: 13,
  layers: [
    layers.One_Star,
    layers.Two_Stars,
    layers.Three_Stars,
    layers.Four_Stars,
    layers.Five_Stars
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "One Star": layers.One_Star,
  "Two Stars": layers.Two_Stars,
  "Three Stars": layers.Three_Stars,
  "Four Stars": layers.Four_Stars,
  "Five Stars": layers.Five_Stars
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
// var icons = {
//   One_Star: L.ExtraMarkers.icon({
//     icon: "ion-settings",
//     iconColor: "white",
//     markerColor: "yellow",
//     shape: "star"
//   }),
//   Two_Stars: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "red",
//     shape: "circle"
//   }),
//   Three_Stars: L.ExtraMarkers.icon({
//     icon: "ion-minus-circled",
//     iconColor: "white",
//     markerColor: "blue-dark",
//     shape: "penta"
//   }),
//   Four_Stars: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "orange",
//     shape: "circle"
//   }),
//   Five_Stars: L.ExtraMarkers.icon({
//     icon: "ion-android-bicycle",
//     iconColor: "white",
//     markerColor: "green",
//     shape: "circle"
//   })
// };


d3.csv("data/listings.csv", function(err, response) {
  if (err) throw err;
  var markers = L.markerClusterGroup();
  // Loop through data
  for (var i = 0; i < response.length; i++) {
    // Set the data location property to a variable   
    var location = response[i].latitude
    // Check for location property
    if (location) {
      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([response[i].latitude, response[i].longitude])
      .bindPopup(response[i].neighbourhood_cleansed))
    
    }
    console.log(response[i].latitude, response[i].longitude)
  }
  // Add our marker cluster layer to the map
  map.addLayer(markers);
});






// // Add our 'lightmap' tile layer to the map
// lightmap.addTo(map);

// // Creating map object and focusing on the Chicago-land area
// var map = L.map("map", {
//   center: [41.894000, -87.631322],
//   zoom: 13
// });

































// Pulling the data from our SQL server

// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "yourusername",
//   password: "yourpassword",
//   database: "mydb"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM customers", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });



// Grabbing our GeoJSON data..
//   d3.json(link, function(data) {
//     // Creating a GeoJSON layer with the retrieved data
//     L.geoJson(data).addTo(map);
//   });

