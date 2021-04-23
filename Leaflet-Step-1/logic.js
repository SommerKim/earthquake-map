
// // Clear map container
// function clearMap() {
//   var container = L.DomUtil.get('map');
//   if(container != null){
//     container._leaflet_id = null;
//   };
// };

// clearMap();

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var earthquakes = [];

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  console.log(earthquakeData);
  console.log(earthquakeData[1].geometry.coordinates[2]);

  // Assign colors to depth
  for (var i = 0; i < earthquakeData.length; i++) {
    // Conditionals for earthquake points

    var color = "";

    if (earthquakeData[i].geometry.coordinates[2] <= 0) {
      color = "dab0ff";
    }
    else if (earthquakeData[i].geometry.coordinates[2] <= 50) {
      color = "#bf82f5";
    }
    else if (earthquakeData[i].geometry.coordinates[2] <= 100) {
      color = "#ac57f7";
    }
    else if (earthquakeData[i].geometry.coordinates[2] <= 150) {
      color = "#921ef7";
    }
    else if (earthquakeData[i].geometry.coordinates[2] <= 200) {
      color = "#7d00eb";
    }
    else if (earthquakeData[i].geometry.coordinates[2] <= 250) {
      color = "#6300ba";
    }
    else if (earthquakeData[i].geometry.coordinates[2] <= 300) {
      color = "#480087";
    }
    else if (earthquakeData[i].geometry.coordinates[2] <= 350) {
      color = "#31015c";
    }
    else {
      color = "#000000";
    }

    // Add circles to map
    earthquakes.push (
      L.circle([earthquakeData[i].geometry.coordinates[0], earthquakeData[i].geometry.coordinates[1]], {
        fillOpacity: 0.75,
        color: "white",
        fillColor: color,
        // Adjust radius
        radius: earthquakeData[i].properties.mag
      })     
    );

  console.log(earthquakes[0]);

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  // function onEachFeature(feature, layer) {
  //   layer.bindPopup("<h3>" + feature.properties.place +
  //     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  // }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  // var earthquakes = L.geoJSON(earthquakeData, {
  //   onEachFeature: onEachFeature
  // });

  // Sending our earthquakes layer to the createMap function

  // createMap(earthquakes);
  }

  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMap = {
    "Light Map": lightmap,
  };

  //Create circles layer
  earthquake_layer = L.layerGroup(earthquakes);

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Earthquakes": earthquake_layer
  };

  var myMap = L.map("map", {
    center: [
      27.09, -102.71
    ],
    zoom: 3,
    layers: [lightmap, earthquake_layer]
  });

  // L.control.layers(baseMap, overlayMaps, {
  //   collapsed: false
  // }).addTo(myMap);

};

// function createMap(earthquakes) {

  // var container = L.DomUtil.get('map');
  // if(container != null){
  //   container._leaflet_id = null;
  // };

  // Define lightmap layer
//   var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "light-v10",
//     accessToken: API_KEY
//   });

//   // Define a baseMaps object to hold our base layers
//   var baseMap = {
//     "Light Map": lightmap,
//   };

//   //Create circles layer
//   earthquake_layer = L.layerGroup(earthquakes);

//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     "Earthquakes": earthquake_layer
//   };

//   // if (L.DomUtil.get('map') !== undefined) { 
//   //   L.DomUtil.get('map')._leaflet_id = null; 
  
//     // Create our map, giving it the streetmap and earthquakes layers to display on load
//     var myMap = L.map("map", {
//       center: [
//         27.09, -102.71
//       ],
//       zoom: 3,
//       layers: [lightmap, earthquake_layer]
//     });
//   // };

//   // Create a layer control
//   // Pass in our baseMaps and overlayMaps
//   // Add the layer control to the map
//   L.control.layers(baseMap, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);
// }
