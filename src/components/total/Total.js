import { Avatar, Box, Typography } from "@material-ui/core";
import React from "react";

const Total = ({ totalAmount }) => {
  return (
    <Box mb={4}>
      <Box mx={"auto"} my={1.5}>
        <Avatar
          alt="avatar"
          src="https://www.vippng.com/png/detail/47-479215_png-cat-funny-icon-13-cats-face-funny.png"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            margin: "0 auto",
          }}
        />
      </Box>
      <Box my={1}>
        <Typography variant="h3" align="center" color="secondary">
          Thao Truong
        </Typography>
      </Box>
      <Box my={1}>
        <Typography variant="h1" align="center" color="secondary">
          £ {totalAmount}
        </Typography>
      </Box>
    </Box>
  );
};

export default Total;
