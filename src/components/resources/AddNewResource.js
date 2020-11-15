import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";

const AddNewResource = ({ handleClose, open, addResourceHandle }) => {
  const [inputText, setinputText] = useState("");
  const onChangeHandle = (e) => {
    setinputText(e.target.value);
  };
  const onCloseHandle = () => {
    setinputText("");
    handleClose();
  };
  const onSubmitHandle = () => {
    setinputText("");
    addResourceHandle(inputText);
  };
  return (
    <Dialog
      open={open}
      onClose={onCloseHandle}
      aria-labelledby="add-new-resource-form"
    >
      <DialogTitle id="add-new-resource-form">Add new resource</DialogTitle>
      <DialogContent>
        <Box mb={4}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            required
            label="Resource name"
            type="text"
            fullWidth
            value={inputText}
            onChange={onChangeHandle}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandle} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmitHandle} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewResource;
