import React from "react";

const ControlPanel = ({ year, onChangeYearHanlder }) => {
  return (
    <div className="control-panel">
      <div key={"year"} className="input">
        <label>Year</label>
        <input
          type="range"
          value={year}
          min={2015}
          max={2040}
          step={5}
          onChange={(e) => onChangeYearHanlder("year", e.target.value)}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
