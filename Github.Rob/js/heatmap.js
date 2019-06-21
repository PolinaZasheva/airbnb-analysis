//PROJECT
// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
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
// icons.addTo(map);

var heat = L.heatLayer([
	[41.894000, -87.631322, 0.2], // lat, lng, intensity
	[41.,-87, 0.5],
], {radius: 25}).addTo(map);


// d3.csv("data/listings.csv", function(response) {

//   // console.log(response);

//   var heatArray = [];
  
//   for (var i = 0; i < response.length; i++) {
//     var location = response[i].location;

//     if (location) {
//       heatArray.push([data.latitiude, data.longitude]);
//     }
//   }
//   console.log(heatArray)

//   var heat = L.heatLayer(heatArray, {
//     radius: 20,
//     blur: 35
//   }).addTo(map);

// });

