import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Box } from "@material-ui/core";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Box pt={2} style={{ height: "100vh" }}>
        <main>{children}</main>
      </Box>

      <Footer />
    </div>
  );
};

export default Layout;
