import {
  AppBar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core";
import { useRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
import { authState } from "../../recoil/auth";
import React, { useState, Fragment } from "react";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import { userLogOut } from "../../actions/auth";
const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [globalAuthState, setGlobalAuthState] = useRecoilState(authState);
  //destructure object
  const { currentUserId } = globalAuthState || { currentUserId: "" };
  const navData = [
    { label: "Home", icon: <HomeIcon />, path: "/", protectedPath: false },
    {
      label: "About",
      icon: <InfoIcon />,
      path: "/about",
      protectedPath: false,
    },
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
      protectedPath: true,
    },
    {
      label: "Profile",
      icon: <AccountBoxIcon />,
      path: "/profile",
      protectedPath: true,
    },
    {
      label: currentUserId ? "Logout" : "Login",
      icon: <ExitToAppIcon />,
      path: "/",
      protectedPath: currentUserId ? true : false,
    },
  ];
  const navItemClickHandle = async (action) => {
    if (action === "Logout") {
      console.log("logout");
      const res = await userLogOut();
      if (res.status === 200) {
        setGlobalAuthState(null);
      }
    } else if (action === "Login") {
      console.log("login");
      //push to home page
    } else {
      console.log(
        "action is not defined. please define action in the function"
      );
      console.log("go to defined path");
    }
  };
  const toggleDrawer = () => {
    setShowNav(!showNav);
  };
  return (
    <nav
      style={{
        position: "fixed",
        width: "100%",
        maxWidth: "500px",
        top: 0,
        zIndex: 1000,
      }}
    >
      <AppBar position="static" style={{ padding: "8px 0" }}>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Button onClick={toggleDrawer}>
            <MenuIcon fontSize="large" />
          </Button>
        </Box>

        <SwipeableDrawer
          anchor={"left"}
          open={showNav}
          onClose={() => setShowNav(false)}
          onOpen={() => setShowNav(true)}
        >
          <List>
            {navData.map((item, index) => (
              <Fragment key={index}>
                {!item.protectedPath ? (
                  <Fragment>
                    <ListItem
                      button
                      onClick={() => navItemClickHandle(item.label)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItem>
                    <Divider />
                  </Fragment>
                ) : (
                  currentUserId && (
                    <Fragment>
                      <ListItem
                        button
                        onClick={() => navItemClickHandle(item.label)}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                      <Divider />
                    </Fragment>
                  )
                )}
              </Fragment>
            ))}
          </List>
        </SwipeableDrawer>
      </AppBar>
    </nav>
  );
};

export default Header;
