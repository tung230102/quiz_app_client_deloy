import LoginIcon from "@mui/icons-material/Login";
import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Heading } from "~/common";

function TopBar() {
  return (
    <Box display="flex" justifyContent="space-between" px={2} py={1}>
      <Box display="flex" alignItems="center">
        <Heading
          noWrap
          sx={{
            mr: 2,
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
          component={Link}
          to="/"
        >
          Quizify
        </Heading>
      </Box>
      <Box display="flex">
        <IconButton component={Link} to="/login">
          <LoginIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default TopBar;
