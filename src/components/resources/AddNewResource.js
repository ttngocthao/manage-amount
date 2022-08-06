import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React from "react";

const AddNewResource = ({
  handleClose,
  open,
  addResourceHandle,
  editResourceHandle,
  itemInView,
  onChangeHandle,
  inputText,
}) => {
  // const [inputText, setinputText] = useState("");

  const onSubmitHandle = () => {
    if (itemInView) {
      editResourceHandle();
    } else {
      addResourceHandle();
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-new-resource-form"
    >
      <DialogTitle id="add-new-resource-form">
        {itemInView ? "Edit the resource" : "Add new resource"}
      </DialogTitle>
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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmitHandle} color="primary">
          {itemInView ? "Save" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewResource;
