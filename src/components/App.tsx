import React, { useState, useEffect } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import { scaleThreshold } from "d3-scale";
import ControlPanel from "./ControlPanel";

import { MAPBOX_ACCESS_TOKEN, INITIAL_VIEW_STATE } from "./constants";
import tokyo23 from "../datas/tokyo23.geo.json";
import population23 from "../datas/population23.json";

function App() {
  const COLOR_SCALE = scaleThreshold()
    .domain([
      0,
      10000,
      50000,
      70000,
      100000,
      300000,
      500000,
      700000,
      1000000,
      1500000,
    ])
    .range([
      [26, 152, 80],
      [102, 189, 99],
      [166, 217, 106],
      [217, 239, 139],
      [255, 255, 191],
      [254, 224, 139],
      [253, 174, 97],
      [244, 109, 67],
      [215, 48, 39],
      [168, 0, 0],
    ]);

  const initialHoverState = {
    object: { properties: { year: [] } },
  };

  const [year, setYear] = useState(2015);
  const [hoverInfo, setHoverInfo] = useState(initialHoverState);

  useEffect(() => {
    let populationMap = new Map();
    population23.forEach((data) => {
      populationMap[data.code] = data.year;
    });

    tokyo23.features.forEach((feature) => {
      feature["properties"] = {
        year: populationMap[feature.id],
      };
    });
  }, []);

  const layers = new GeoJsonLayer({
    id: "geojson",
    data: tokyo23,
    opacity: 0.8,
    stroked: false,
    filled: true,
    extruded: true,
    wireframe: true,
    getElevation: (f) => f.properties.year[year] / 50,
    getFillColor: (f) => COLOR_SCALE(f.properties.year[year]),
    updateTriggers: {
      getFillColor: { year },
      getElevation: { year },
    },
    getLineColor: [255, 255, 255],
    pickable: true,
    onHover: (info) => setHoverInfo(info),
  });

  const onChangeYearHanlder = (name, value) => {
    if (name === "year") {
      setYear(value);
    }
  };

  return (
    <>
      <DeckGL
        layers={layers}
        pickingRadius={5}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        getTooltip={() =>
          hoverInfo.object && {
            text: `人口：${hoverInfo.object.properties.year[year]}人`,
          }
        }
      >
        <StaticMap
          reuseMaps
          mapStyle="mapbox://styles/mapbox/dark-v9"
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </DeckGL>
      <ControlPanel year={year} onChangeYearHanlder={onChangeYearHanlder} />
    </>
  );
}

export default App;
