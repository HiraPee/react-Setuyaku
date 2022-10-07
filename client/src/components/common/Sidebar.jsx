import { Drawer, IconButton, List, ListItemButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LogoutOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React from "react";
import assets from "../../assets/index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: 250,
        height: "100vh",
      }}
    >
      <List sx={{ width: 250, height: "100vh", backgroundColor: assets.colors.secondary }}>
        <ListItemButton>
          <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography fontWeight="700">{user.name}</Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>

        <Box sx={{ paddingTop: "10px" }}></Box>

        <ListItemButton component={Link} to={"/search"}>
          <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography fontWeight="700">🔎さがす</Typography>
          </Box>
        </ListItemButton>

        <Box sx={{ paddingTop: "10px" }}></Box>

        <ListItemButton component={Link} to={"/post"}>
          <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography fontWeight="700">📝のせる</Typography>
          </Box>
        </ListItemButton>

        <Box sx={{ paddingTop: "10px" }}></Box>

        <ListItemButton>
          <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography fontWeight="700">🌟お気に入り</Typography>
          </Box>
        </ListItemButton>

        <Box sx={{ paddingTop: "10px" }}></Box>

        <ListItemButton>
          <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography fontWeight="700">プライベート</Typography>
            <IconButton>
              <AddBoxOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
