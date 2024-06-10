import { Button, CircularProgress } from "@mui/material";

export const CommonButton = ({
  type = "text",
  variant = "contained",
  color = "primary",
  fullWidth = false,
  disabled = false,
  children = <></>,
  onClick = () => {},
  startIcon = null,
  sx = { m: 1 },
  loading = false,
  ...props
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      sx={{ ...sx }}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      startIcon={startIcon}
      {...props}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};
