import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels({ option, setOption, options, label }) {
  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={option}
        fullWidth
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem value={Object.keys(option)[0]}>
            {Object.values(option)}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
