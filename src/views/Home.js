import React, { lazy } from "react";
//import Login from "../components/login/Login";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/auth";
import { Typography, Box, Container } from "@material-ui/core";
import SpinningImg from "../images/cat-spinner.gif";
const Login = lazy(() => import("../components/login/Login"));

const Home = () => {
  const globalAuthState = useRecoilValue(authState);
  const { currentUserId } = globalAuthState || { currentUserId: "" };
  return (
    <div>
      <Box my={4} px={3}>
        <Typography variant="h1">Manage Amount</Typography>
      </Box>

      {/* <Container>
        <img
          alt="loading gif"
          src={SpinningImg}
          style={{
            display: "block",
            margin: "0 auto",
            maxWidth: "500px",
            width: "100%",
          }}
        />
      </Container> */}

      {currentUserId ? <Typography>Welcome back</Typography> : <Login />}
    </div>
  );
};

export default Home;
