import { Typography } from "@mui/material";

export const Heading = ({
  variant = "h6",
  color = "gray",
  textAlign = "center",
  children,
  sx = { m: 1 },
  component = null,
  to = "",
  noWrap = false,
}) => {
  return (
    <Typography
      noWrap={noWrap}
      variant={variant}
      sx={sx}
      color={color}
      textAlign={textAlign}
      component={component}
      to={to}
    >
      {children}
    </Typography>
  );
};
