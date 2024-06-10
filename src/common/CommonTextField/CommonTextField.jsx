import { TextField } from "@mui/material";

export const CommonTextField = ({
  label = "",
  variant = "standard",
  fullWidth = true,
  disabled = false,
  name = "",
  type = "text",
  register = () => {},
  errors = "",
  required = false,
  minLength = null,
  min = null,
  max = null,
  pattern = null,
  helperText = "",
  value = undefined,
  defaultValue = undefined,
  onChange = () => {},
}) => {
  return (
    <TextField
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      type={type}
      {...register(name, {
        required: required && `This field ${name} is required`,
        minLength: minLength && {
          value: minLength,
          message: `Must be at least ${minLength} characters long`,
        },
        min: min && {
          value: min,

          message: `Value must be greater than or equal to ${min}.`,
        },
        max: max && {
          value: max,
          message: `Value must be less than or equal to ${max}.`,
        },
        pattern: pattern && {
          value: pattern.value,
          message: pattern.message,
        },
      })}
      error={!!errors[name]}
      helperText={helperText || (errors[name] && errors[name].message)}
      autoComplete={name === "password" ? "current-password" : "off"}
    />
  );
};
