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
import { useHistory, useLocation } from "react-router-dom";
import { authState } from "../../recoil/auth";
import React, { useState, Fragment, useEffect } from "react";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { resourcesState } from "../../recoil/resources";
import { theme } from "../../materialUI.config";

import { userLogOut } from "../../actions/auth";
const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const showBackBtn = useRecoilValue(resourcesState).atResourceDetailsPage;
  const setShowBackBtn = useSetRecoilState(resourcesState);

  //  Object.fromEntries(new URLSearchParams(search.replace("?", "")))
  const [showNav, setShowNav] = useState(false);
  //const [showBackBtn, setShowBackBtn] = useState(false);
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

  const navItemClickHandle = async (action, path) => {
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
      history.push(path);
    }
    setShowNav(false);
    setShowBackBtn((preState) => {
      return { ...preState, atResourceDetailsPage: false };
    });
  };

  const toggleDrawer = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    // if (location.pathname.includes("/dashboard") && location.search !== "") {
    //   setShowBackBtn(true);
    // }
    console.log("location", location);
    console.log("recoil", showBackBtn);
  }, []);

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
        <Box
          display="flex"
          alignItems="center"
          justifyContent={showBackBtn ? "space-between" : "flex-end"}
        >
          {showBackBtn && (
            <Button
              onClick={() => {
                setShowBackBtn((preState) => {
                  return { ...preState, atResourceDetailsPage: false };
                });
                history.push("/dashboard");
              }}
              aria-label="back to dashboard"
              style={{
                backgroundColor: theme.palette.success.main,
                marginLeft: theme.spacing(2),
                color: "white",
              }}
            >
              BACK
            </Button>
          )}
          <Button aria-label="navigation" onClick={toggleDrawer}>
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
                      onClick={() => navItemClickHandle(item.label, item.path)}
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
                        onClick={() =>
                          navItemClickHandle(item.label, item.path)
                        }
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
