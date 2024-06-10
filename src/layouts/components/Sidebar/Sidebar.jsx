import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SidebarComponent = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <Sidebar collapsed={isCollapsed}>
      <Menu>
        {/* Collapsed */}
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "10px 0 20px 0",
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography variant="h5">ADMIN</Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>
        {/* End Collapsed */}

        {!isCollapsed && (
          <Box mb="25px">
            <Link to="/">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  width="50px"
                  height="50px"
                  alt="profile-user"
                  src="/logo192.png"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
            </Link>
            <Box textAlign="center">
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                Quizify
              </Typography>
            </Box>
          </Box>
        )}

        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Item
            title="Dashboard"
            to="/dashboard"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Typography
            variant="h6"
            fontSize="1rem"
            sx={{ m: "15px 0 5px 20px " }}
          >
            Data
          </Typography>
          <Item
            title="Manage Users"
            to="/users"
            icon={<PeopleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Manage Question"
            to="/questions"
            icon={<QuestionAnswerIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
