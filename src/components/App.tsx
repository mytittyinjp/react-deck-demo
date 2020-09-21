/// app.js
import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { H3HexagonLayer } from "@deck.gl/geo-layers";
import { MAPBOX_ACCESS_TOKEN, INITIAL_VIEW_STATE } from "./Constant";
import {
  initialH3Rings,
  deleteExisitsData,
  getH3Rings,
  reduceH3Data,
} from "./HexagonLayer";

const App = () => {
  const [h3Data, setH3Data] = useState(initialH3Rings);

  const OnClickHexagonHandler = (info, event) => {
    const h3Rings = getH3Rings(info.coordinate[1], info.coordinate[0]);
    const newH3Data = deleteExisitsData(h3Data, h3Rings);
    setH3Data(reduceH3Data(h3Data, newH3Data));
  };

  const hexagonLayer = new H3HexagonLayer({
    id: "h3-hexagon-layer",
    data: h3Data,
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
    onClick: (info, event) => OnClickHexagonHandler(info, event),
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={hexagonLayer}
      getTooltip={({ object }) => object && `${object.count}%`}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
};
export default App;
