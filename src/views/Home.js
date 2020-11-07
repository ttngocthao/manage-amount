import React from "react";
import Login from "../components/login/Login";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/auth";
import { Typography, Box } from "@material-ui/core";
const Home = () => {
  const globalAuthState = useRecoilValue(authState);
  const { currentUserId } = globalAuthState || { currentUserId: "" };
  return (
    <div>
      <Box my={4} px={3}>
        <Typography variant="h1">Manage Amount</Typography>
      </Box>

      {currentUserId ? <Typography>Welcome back</Typography> : <Login />}
    </div>
  );
};

export default Home;
