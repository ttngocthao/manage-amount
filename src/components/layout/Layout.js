import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Box } from "@material-ui/core";

const Layout = ({ children }) => {
  return (
    <Box pt={10}>
      <Header />
      <Box pt={2} style={{ minHeight: "100vh" }}>
        <main>{children}</main>
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
