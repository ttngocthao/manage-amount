import { Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { userLogIn } from "../../actions/auth";
import { theme } from "../../materialUI.config";
const Login = () => {
  const [inputVals, setInputVals] = useState({
    email: "",
    password: "",
  });
  const changeHandle = (e) => {
    setInputVals({
      ...inputVals,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    if (inputVals.email !== "" && inputVals.password !== "") {
      const res = await userLogIn(inputVals.email, inputVals.password);
      console.log(res);
    }
  };
  return (
    <Box boxShadow={3} maxWidth={400} mx="auto" px={3} py={4}>
      <form onSubmit={submitHandle}>
        <Typography variant="h2">Login</Typography>
        <Box my={2}>
          <TextField
            name="email"
            onChange={changeHandle}
            label="Email"
            color="primary"
            value={inputVals.email}
          />
        </Box>

        <Box my={2}>
          <TextField
            onChange={changeHandle}
            name="password"
            label="Password"
            type="password"
            color="primary"
            value={inputVals.password}
          />
        </Box>

        <Box my={2}>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
