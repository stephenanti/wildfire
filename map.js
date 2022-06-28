mapboxgl.accessToken = "pk.eyJ1Ijoic3RlcGhlbmFudGkiLCJhIjoiY2t4NDN5MDJ2MDJkcTJ2cGFjOGk3MW9jcyJ9.idvR4RaqkBIA5w32u482kw";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/stephenanti/cl4w5fu59002f14qx3a2sm1gu",
  center: [-99, 38],
  zoom: 3.5,
  maxZoom: 6,
  minZoom: 3,
  projection: 'albers',
});

map.on('load', function () {
  // This is the function that finds the first symbol layer
  let layers = map.getStyle().layers;
  let firstSymbolId;
  for (var i = 0; i < layers.length; i++) {
  if (layers[i].type === 'symbol') {
  firstSymbolId = layers[i].id;
  break;
  }
  }
  map.addLayer(
  {
  id: "wildfire-outline",
  type: "line",
  source: {
  type: "geojson",
  data: "data/stateFire.geojson",
  },
  paint: {
  "line-color": "#ffffff",
  "line-width": 0.7,
  },
  },
  "waterway-label" // Here's where we tell Mapbox where to slot this new layer
  );
  
  map.addLayer(
  {
  id: "wildfire-units",
  type: "fill",
  source: {
  type: "geojson",
  data: "data/statesFire.geojson",
  },
  minzoom: .5,
  paint: {
  "fill-color": [
  'interpolate',
  ['linear'],
  ['get', 'Total number of exposed HUs'],
  0,
  '#b8b894',
  2000000,
  '#0CF6EF',
  4000000,
  '#701EF3',
  6000000,
  '#D35400',
  8000000,
  '#F8C471',
  10000000,
  '#58D68D',
  ],
  "fill-opacity": 0.6
  }
  },
  "wildfire-outline"
  );
  
  });



  // Create the popup
map.on('click', 'wildfire-units', function (e) {
  var stateName = e.features[0].properties.NAME;
  var totalUnits = e.features[0].properties['Total number of exposed HUs'];
  totalUnits = totalUnits.toLocaleString();
  stateName = stateName.toUpperCase();
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h4>'+stateName+'</h4>'
          +'<p>'+totalUnits+
          ' housing units in the state were exposed to wild fire'+'</p>')
      .addTo(map);
});



// mapboxgl.accessToken = "pk.eyJ1Ijoic3RlcGhlbmFudGkiLCJhIjoiY2t4NDN5MDJ2MDJkcTJ2cGFjOGk3MW9jcyJ9.idvR4RaqkBIA5w32u482kw";
// var map = new mapboxgl.Map({
//   container: "map",
//   style: "mapbox://styles/stephenanti/cl4w5fu59002f14qx3a2sm1gu",
//   center: [-99, 38],
//   zoom: 3.5,
//   maxZoom: 6,
//   minZoom: 3,
//   projection: 'albers',
// });

// map.on("load",function(){
//   map.addLayer ({
//     id: "wildfire_outline",
//     type: "line",
//     source: {
//       type: "geojson",
//       data: "data/statesFire.geojson",
//     },
//     paint: {
//       "line-color": "#ffffff",
//       "line-width": 1,
//     }

//   },"waterway-label");

  
// //   map.addLayer({
// //     id:"wildfire-households",
// //     type: "fill",
// //     source: { 
// //       type: "geojson",
// //       data: "data/statesFire.geojson",
// //     },
// //     maxzoom: 9,
// //     paint: {
// //       "fill-color": [
// //         "match",
// //         ["get","Total number of exposed HUs"],
// //         0,
// //         '#b8b894',
// //         2000000,
// //         '#0CF6EF',
// //         4000000,
// //         '#701EF3',
// //         6000000,
// //         '#D35400',
// //         8000000,
// //         '#F8C471',
// //         10000000,
// //         '#58D68D',
// //         '#ffffff',
// //       ],
// //       "fill-outline-color":"#ffffff",

// //     },
  
// //   },
// //    "wildfire_outline"
//   );
// }
// );
