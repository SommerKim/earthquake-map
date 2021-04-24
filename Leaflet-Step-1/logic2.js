var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var earthquakeMarkers = [];

// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  console.log(earthquakeData);
  console.log(earthquakeData[1].geometry.coordinates[2]);
  console.log(typeof(earthquakeData[1].geometry.coordinates[2]));
  
  // Assign colors to depth
  for (var i = 0; i < earthquakeData.length; i++) {

    var color = "";
    
    if (earthquakeData[i].geometry.coordinates[2] <= 0) {
      color = "#dab0ff";
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
    earthquakeMarkers.push(
      L.circle([earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]], {
        fillOpacity: 0.75,
        // color: "red",
        color: color,
        // Adjust radius
        radius: earthquakeData[i].properties.mag * 10000
      })    
    );
  };

  // Add map tiles
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  // Make layer for markers
  var earthquakes = L.layerGroup(earthquakeMarkers);

  // Define baseMap and overlayMaps objects to hold our layers
  var baseMap = {"Light Map": lightmap,};

  console.log(earthquakeMarkers);
  console.log(earthquakes);

  var overlayMaps = {"Earthquakes": earthquakes,};

  var myMap = L.map("map", {
    center: [27.09, -102.71],
    zoom: 3,
    layers: [lightmap, earthquakes]
  });

  //Add layer control
  L.control.layers(baseMap, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Add legend
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {
  
      var div = L.DomUtil.create('div', 'info legend');
          limits = [-10, 50, 100, 150, 200, 250, 300, 350, 400],
          labels = ['-49', '50-99', '100-149', '150-199', '200-249', '250-299', '300-349', '350-399', '400+']
          colors = ['#dab0ff', '#bf82f5', '#ac57f7', '#921ef7', '#7d00eb', '#6300ba', '#480087', '#31015c', '#000000'];
  
      // loop through depth intervals and generate a label with a colored square for each interval
      for (var i = 0; i < limits.length; i++) {
          div.innerHTML +=
              '<i style="background-color:' + colors[i] + '"></i> ' + '<i>' +
              labels[i] + '</i>' + '<br>';
      }
  
      return div;
  };
  
  legend.addTo(myMap);

};