"use client";
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button, Avatar, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../state";

export default function Navbar() {

  const dispatch = useDispatch();
  const token = document.cookie.split("; ").find((row) => row.startsWith("token="));
  const user = token ? JSON.parse(atob(token.split("=")[1].split(".")[1])) : null;

  //? function to handle logout
  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0; secure; SameSite=Strict";
    dispatch(setLogout());
    localStorage.clear();
    navigate("/");
    return
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#b70924" }}>
      <Toolbar sx={{ minHeight: "50px", display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo or Title */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          JUMERP
        </Typography>

        {/* Center: Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/notices">
            Notices
          </Button>
          <Button color="inherit" component={Link} to="/faculty">
            Faculty
          </Button>
          <Button color="inherit" component={Link} to="/events">
            Events
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
        </Box>

        {/* Right: User Full Name and Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={user?.avatar || "/default-avatar.png"}
            alt={user?.name}
            sx={{ width: 40, height: 40, cursor: "pointer" }}
            onClick={handleMenuOpen}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            disableAutoFocusItem
          >
            {user ? (
              [
                <MenuItem key="user - name" component={Link} to={`/profile/${user.name}`} onClick={handleMenuClose}>
                  {user.name}
                </MenuItem>,
                <MenuItem key="logout" component={Link} onClick={handleLogout}>
                  Logout
                </MenuItem>,
              ]
            ) : (
              [
                <MenuItem key="user-login" component={Link} to="/auth" onClick={handleMenuClose}>
                  Login
                </MenuItem>,
                <MenuItem key="administer-login" component={Link} to="/admin-login" onClick={handleMenuClose}>
                  Administrative Login
                </MenuItem>
              ]
            )}

          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}