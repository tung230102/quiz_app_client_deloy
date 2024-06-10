import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const CommonSingleSelect = ({
  label,
  value = "",
  onChange,
  options,
}) => {
  return (
    <Box m={1} minWidth={200}>
      <FormControl fullWidth>
        <InputLabel id={`single-select-label${label}`}>{label}</InputLabel>
        <Select
          labelId={`single-select-label${label}`}
          id={`single-select${label}`}
          value={value}
          label={label}
          onChange={(e) => onChange(e.target.value)}
        >
          {options &&
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};
