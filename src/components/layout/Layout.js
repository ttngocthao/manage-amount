import React, { lazy, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//import Header from "../header/Header";
//import Footer from "../footer/Footer";
import { Box, makeStyles } from "@material-ui/core";

const Header = lazy(() => import("../header/Header"));
const Footer = lazy(() => import("../footer/Footer"));

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: "100vh",
  },
}));

const Layout = ({ children }) => {
  const styles = useStyles();
  return (
    <Box pt={10}>
      <Header />
      <Box pt={2} className={styles.main}>
        <main>{children}</main>
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
