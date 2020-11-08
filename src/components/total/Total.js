import { Avatar, Box, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    margin: "0 auto",
  },
}));

const Total = ({ totalAmount }) => {
  const styles = useStyles();
  return (
    <Box mb={4}>
      <Box mx={"auto"} my={1.5}>
        <Avatar
          alt="avatar"
          src="https://www.vippng.com/png/detail/47-479215_png-cat-funny-icon-13-cats-face-funny.png"
          className={styles.avatar}
        />
      </Box>
      <Box my={1}>
        <Typography variant="h3" align="center">
          Thao Truong
        </Typography>
      </Box>
      <Box my={1}>
        <Typography variant="h1" align="center">
          £ {totalAmount.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default Total;
