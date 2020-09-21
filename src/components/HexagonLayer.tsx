import * as h3 from "h3-js";
import { INITIAL_LATITUDE, INITIAL_LONGITUDE } from "./Constant";

export const getH3Rings = (latitude, longitude) => {
  const h3Index = h3.geoToH3(latitude, longitude, 10);
  const h3Rings = h3.kRing(h3Index, 1);
  return h3Rings;
};

export const deleteExisitsData = (prevH3Rings, h3Rings) => {
  let newH3Rings: string[] = [];
  h3Rings.forEach((hexData: string) => {
    const result = prevH3Rings.find(
      (prevHexData) => prevHexData.hex === hexData
    );
    if (!result) newH3Rings.push(hexData);
  });
  return newH3Rings;
};
export const reduceH3Data = (prevH3Rings, h3Rings) => {
  const updateH3Rings = h3Rings.map((hexData) => {
    return { hex: hexData, count: Math.random() * 100 };
  });
  return [...prevH3Rings, ...updateH3Rings];
};

const h3Rings = getH3Rings(INITIAL_LATITUDE, INITIAL_LONGITUDE);
export const initialH3Rings = reduceH3Data([], h3Rings);
