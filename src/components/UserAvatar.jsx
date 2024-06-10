import {
  Avatar,
  Box,
  IconButton,
  Menu,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authKey } from "../constants";
import { setDataLocalStorage, userDataLocalStorage } from "../utils";

function UserAvatar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const { avatar, name, isAdmin } = userDataLocalStorage();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);

    navigate("/login", { replace: true });
    setDataLocalStorage(authKey.tokens, {});
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleMenu} sx={{ p: 0 }}>
            <Avatar src={avatar} alt={`Avatar of ${name}`} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={Link} to="/profile">
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          {isAdmin && (
            <MenuItem onClick={handleClose} component={Link} to="/users">
              <Typography textAlign="center">Dashboard</Typography>
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
}

export default UserAvatar;
