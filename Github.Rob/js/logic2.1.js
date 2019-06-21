//PROJECT
//THIS SHOWS A MARKER FOR EVERY LISTING

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
 });

 
//  var One_Star = (data.review_scores_rating < "70");
//  var Two_Stars = (data.review_scores_rating >=70 & data.review_scores_rating < 80)

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


d3.csv("data/listings.csv", function(err, review_data) {
    if (err) throw err;
       
  // parse data
    review_data.forEach(function(data) {
        var marker = L.marker([data.latitude, data.longitude]).addTo(map);
        marker.bindPopup("<h3><hr> Neighborhood: " + data.neighbourhood_cleansed +
        "</h3><hr><p>Review Score:" + data.review_scores_rating + "</p>" +
        "</h3><hr><p>Property Type: " + data.property_type + "</p>")
      }
    );
    });
// var marker = L.marker([data.latitude, data.longitude]).addTo(map);
// marker.bindPopup("<b> My Marker!</b>").openPopup;


//[41.894000, -87.631322]
//Need to declare a variable for 1-5 stars.  i.e. 5 star >= 90, 4 star<90, >=80
//variable for lat and long
//loop through lat and long to put marker at that location