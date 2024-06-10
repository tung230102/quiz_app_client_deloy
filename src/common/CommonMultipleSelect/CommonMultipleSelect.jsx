import Select from "react-select";
import { Controller } from "react-hook-form";
import { Box } from "@mui/material";

export const CommonMultipleSelect = ({
  control = null,
  name = "roles",
  error,
  defaultValue = [{ value: "user", label: "User" }],
  options = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ],
  message = "Please select at least one option",
  isMulti = true,
}) => {
  return (
    <Box mt={1}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: message }}
        render={({ field }) => (
          <Select isMulti={isMulti} {...field} options={options} />
        )}
      />
      {error && (
        <Box color="#d32f2f" mt={0.4} fontSize={13}>
          {error}
        </Box>
      )}
    </Box>
  );
};
