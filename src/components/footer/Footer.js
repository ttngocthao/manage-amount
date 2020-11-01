import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
} from "@material-ui/core";
import React, { useState } from "react";
import ContactMailIcon from "@material-ui/icons/ContactMail";

const Footer = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <footer>
      <Box mt={4}>
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="Recents"
            value="recents"
            icon={<ContactMailIcon />}
          />
          <BottomNavigationAction
            label="Favorites"
            value="favorites"
            icon={<ContactMailIcon />}
          />

          <BottomNavigationAction
            label="Folder"
            value="folder"
            icon={<ContactMailIcon />}
          />
        </BottomNavigation>
      </Box>
    </footer>
  );
};

export default Footer;
