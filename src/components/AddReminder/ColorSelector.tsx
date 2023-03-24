// Create the Color select component
// this currently allows for limited color selection
// colors should be stored with the event data object // this needs to be added to the interface

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import React from "react";

const ColorSelect = ({ name, value, handleChange }) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Color</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="red"
        value={value}
        name={name}
        onChange={handleChange}
      >
        {/* Can make this a map of available colors to select in the future from ColorUtils.tsx */}
        <FormControlLabel
          value="red"
          control={<Radio />}
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  height: "1em",
                  width: "1em",
                  background: "red",
                  marginRight: ".5em",
                }}
              />
              <span>Red</span>
            </div>
          }
        />
        <FormControlLabel
          value="orange"
          control={<Radio />}
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  height: "1em",
                  width: "1em",
                  background: "orange",
                  marginRight: ".5em",
                }}
              />
              <span>Orange</span>
            </div>
          }
        />
        <FormControlLabel
          value="yellow"
          control={<Radio />}
          label={
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  height: "1em",
                  width: "1em",
                  background: "yellow",
                  marginRight: ".5em",
                }}
              />
              <span>Yellow</span>
            </div>
          }
        />
      </RadioGroup>
    </FormControl>
  );
};

export default ColorSelect;
