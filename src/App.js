import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "./recoil/auth";
import { Auth } from "./firebase";

import Layout from "./components/layout/Layout";

import Routing from "./Routing";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  appBkg: {
    backgroundImage:
      "linear-gradient(rgb(85, 204, 212), rgb(199, 218, 199), rgb(255, 182, 141), rgb(254, 141, 123), rgb(254, 103, 134))",
  },
}));
function App() {
  const styles = useStyles();
  const setAuthState = useSetRecoilState(authState);

  useEffect(() => {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("uid", user.uid);
        setAuthState({
          currentUserEmail: user.email,
          currentUserId: user.uid,
        });
        //  console.log("user has signed in");
      } else {
        console.log("user not sign in");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.appBkg}>
      <Layout>
        <Routing />
      </Layout>
    </div>
  );
}

export default App;
