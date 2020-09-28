import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { MIN_YEAR, MAX_YEAR } from "./constants";

const SliderInput = withStyles({
  root: {
    marginLeft: 12,
    width: "300px",
  },
})(Slider);

const ControlPanel = ({ year, onChangeYearHanlder }) => {
  return (
    <div className="control-panel">
      <Typography>Year</Typography>
      <SliderInput
        aria-label="Year"
        min={MIN_YEAR}
        max={MAX_YEAR}
        step={5}
        marks
        defaultValue={MIN_YEAR}
        onChange={(event, newValue) => onChangeYearHanlder("year", newValue)}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

export default ControlPanel;
