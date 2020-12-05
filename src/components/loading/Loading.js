import { Box, Modal } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

import LoadingImg from "../../images/loadingSpinner.gif";

const useStyles = makeStyles((theme) => ({
  figure: {
    maxWidth: "100px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },
  img: {
    width: "100%",
  },
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
}));

const Loading = () => {
  const styles = useStyles();

  return (
    <Box className={styles.container}>
      <Modal
        open={true}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <figure className={styles.figure}>
          <img alt="loading gif" src={LoadingImg} className={styles.img} />
        </figure>
      </Modal>
    </Box>
  );
};

export default Loading;
