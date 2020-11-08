import React, { lazy, Suspense } from "react";

import { Box, makeStyles } from "@material-ui/core";

const Header = lazy(() => import("../header/Header"));
const Footer = lazy(() => import("../footer/Footer"));

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: "100vh",
  },
}));

const renderLoader = () => <p>Loading</p>;

const Layout = ({ children }) => {
  const styles = useStyles();
  return (
    <Suspense fallback={renderLoader()}>
      <Box pt={10}>
        <Header />
        <Box pt={2} className={styles.main}>
          <main>{children}</main>
        </Box>

        <Footer />
      </Box>
    </Suspense>
  );
};

export default Layout;
