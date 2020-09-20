/// app.js
import React from "react";
import DeckGL from "@deck.gl/react";
import { H3HexagonLayer } from "@deck.gl/geo-layers";
import { StaticMap } from "react-map-gl";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibmFuZGVtbyIsImEiOiJja2R5Z21qZ2swMjRtMnlueWo1cm9zbGl0In0.pQdWOAinK4tNCUCr7U4oKQ";

// Viewport settings
const INITIAL_VIEW_STATE = {
  latitude: 35.658577,
  longitude: 139.745451,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

const App = () => {
  const h3data = [
    { hex: "8a2f5aade42ffff", count: 0 },
    { hex: "8a2f5aade427fff", count: 6 },
    { hex: "8a2f5aade407fff", count: 6 },
    { hex: "8a2f5aade40ffff", count: 9 },
    { hex: "8a2f5aade477fff", count: 15 },
    { hex: "8a2f5aade55ffff", count: 52 },
    { hex: "8a2f5aade557fff", count: 12 },
  ];

  const hexagonLayer = new H3HexagonLayer({
    id: "h3-hexagon-layer",
    data: h3data,
    pickable: true,
    wireframe: false,
    filled: true,
    extruded: true,
    stroked: true,
    getLineColor: [0, 0, 0],
    lineWidthMinPixels: 4,
    opacity: 0.7,
    elevationScale: 0,
    getHexagon: (d) => d.hex,
    getFillColor: (d) => [255 - (255 * d.count) / 100, 255, 255],
    getElevation: (d) => d.count,
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={hexagonLayer}
      getTooltip={({ object }) => object && `object_hex: ${object.hex}`}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
};
export default App;
