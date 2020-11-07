import React, { lazy, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//import Header from "../header/Header";
//import Footer from "../footer/Footer";
import { Box } from "@material-ui/core";

const Header = lazy(() => import("../header/Header"));
const Footer = lazy(() => import("../footer/Footer"));

const Layout = ({ children }) => {
  const [showBackBtn, setShowBackBtn] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.includes("/dashboard") && pathname !== "/dashboard") {
      setShowBackBtn(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box pt={10}>
      <Header showBackBtn={showBackBtn} />
      <Box pt={2} style={{ minHeight: "100vh" }}>
        <main>{children}</main>
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
