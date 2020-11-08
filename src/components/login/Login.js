import { Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { userLogIn } from "../../actions/auth";
//import { theme } from "../../materialUI.config";
const Login = () => {
  const history = useHistory();
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
      try {
        const res = await userLogIn(inputVals.email, inputVals.password);

        if (res.status === 200) {
          history.push("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Box
      boxShadow={3}
      maxWidth={400}
      mx="auto"
      px={3}
      py={4}
      style={{
        backgroundColor: "rgba(255,255,255,.7)",
        borderRadius: "8px",
        width: "80%",
      }}
    >
      <form onSubmit={submitHandle}>
        <Typography variant="h2" color="primary">
          Login
        </Typography>
        <Box my={2}>
          <TextField
            name="email"
            id="email"
            onChange={changeHandle}
            label="Email"
            color="primary"
            value={inputVals.email}
            fullWidth
            required
          />
        </Box>

        <Box my={2}>
          <TextField
            onChange={changeHandle}
            name="password"
            id="password"
            label="Password"
            type="password"
            color="primary"
            value={inputVals.password}
            fullWidth
            required
          />
        </Box>

        <Box mb={2} mt={4}>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
