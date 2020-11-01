import React from "react";
import Login from "../components/login/Login";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/auth";
import { Typography } from "@material-ui/core";
const Home = () => {
  const globalAuthState = useRecoilValue(authState);
  const { currentUserId } = globalAuthState || { currentUserId: "" };
  return (
    <div>
      {currentUserId ? <Typography>Welcome back</Typography> : <Login />}
    </div>
  );
};

export default Home;
