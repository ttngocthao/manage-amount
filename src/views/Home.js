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
      <Box my={2} px={3}>
        <Typography variant="body1">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem.
        </Typography>
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
