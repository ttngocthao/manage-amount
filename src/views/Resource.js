import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState, Suspense } from "react";
import { makeStyles } from "@material-ui/core";
import { useLocation, useParams } from "react-router-dom";
import {
  getResourceDetails,
  addNewRecord,
  deleteRecord,
  updateRecord,
} from "../actions/resources";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  moneyAction: {
    color: "#333",
    borderColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "300px",
  },
  addRecordBtn: { color: "white", fontSize: "3rem" },
  addRecordForm: {
    backgroundColor: "rgba(255,255,255,.8)",
    padding: theme.spacing(3),
    borderRadius: "9px",
    width: "100%",
    maxWidth: "300px",
    margin: `${theme.spacing(3)}px auto`,
  },
  moneyIn: {
    backgroundColor: "rgba(	76,179,178,.8)",
    marginLeft: "auto",
  },
  moneyOut: {
    backgroundColor: "rgba(254,126,128,.8)",
  },

  expanded: {
    marginLeft: "auto",
  },
  displayContent: {
    "& .MuiAccordionSummary-content": {
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
}));

const renderLoader = () => <p>Loading</p>;

const Resource = () => {
  const styles = useStyles();
  const { id } = useParams();
  const { search } = useLocation();
  const currentUserId = localStorage.getItem("uid");
  const [state, setState] = useState({
    dataLoaded: false,
    data: null,
    dataName: Object.fromEntries(new URLSearchParams(search.replace("?", "")))
      .name,
    totalAmount: 0,
  });
  const [formState, setFormState] = useState({
    showForm: false,
    amount: "",
    moneyIn: true,
    reason: "",
    formTitle: "Add a new record",
    textBtn: "Submit",
    updateRecord: false,
    editItemId: null,
  });
  const { dataLoaded, data, dataName, totalAmount } = state;
  useEffect(() => {
    (async () => {
      window.scrollTo(0, 0);
      if (currentUserId) {
        const res = await getResourceDetails(currentUserId, id, dataName);
        if (res.status === 200) {
          setState({
            ...state,
            dataLoaded: true,
            data: res.data,
            totalAmount: calculateTotalAmount(res.data),
          });
         // console.log(dataName && dataName,res);
        } else {
          console.log(res);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeHandle = (e) => {
    if (e.target.type !== "checkbox") {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.checked,
      });
    }
  };

  const calculateTotalAmount = (dataArr) => {
    if( dataArr.length<=0) return 0 
    const total = dataArr.reduce(
      (current, obj) => current + obj.amount * (obj.moneyIn ? 1 : -1),
      0
    );
    return Math.floor(total * 100) / 100;
  };

  const addNewRecordHandle = async () => {
    const res = await addNewRecord(
      dataName,
      id,
      Number(formState.amount),
      currentUserId,
      formState.moneyIn,
      formState.reason,
      totalAmount
    );

    //update ui
    if (res.status === 200) {
      const newRecord = {
        recordId: res.recordId,
        resourceId: id,
        owner: currentUserId,
        moneyIn: formState.moneyIn,
        amount: formState.amount,
        reason: formState.reason,
        createdAt: "just now",
      };
      console.log("res", res);
      setState({
        ...state,
        data: [newRecord, ...data],
        totalAmount: calculateTotalAmount([newRecord, ...data]),
      });
      setFormState({
        amount: "",
        reason: "",
        moneyIn: true,
        showForm: false,
      });
    } else {
      console.log(res);
    }
  };

  const deleteRecordHandle = async (recordItem) => {
    const { owner, resourceId, recordId, moneyIn, amount } = recordItem;
    const res = await deleteRecord(
      owner,
      resourceId,
      recordId,
      totalAmount,
      moneyIn,
      amount
    );
    //alert(res.msg);
    if (res.status === 200) {
      const newData = data.filter((item) => item.recordId !== recordId);
      alert(res.msg);

      //update ui
      setState({
        ...state,
        data: newData,
        totalAmount: calculateTotalAmount(newData),
      });
    }
    console.log(res);
  };

  const editRecordHandle = async (recordItem) => {
    const { recordId, moneyIn, amount, reason } = recordItem;
    setFormState({
      ...formState,
      showForm: true,
      moneyIn,
      amount,
      reason,
      formTitle: "Edit this record",
      textBtn: "Save",
      updateRecord: true,
      editItemId: recordId,
    });
  };

  const updateRecordHandle = async () => {
    const editItemIndex = data
      .map((item) => item.recordId)
      .indexOf(formState.editItemId);

    const newData = [
      ...data.slice(0, editItemIndex),
      {
        ...data.slice(editItemIndex, editItemIndex + 1)[0],
        moneyIn: formState.moneyIn,
        amount: formState.amount,
        reason: formState.reason,
      },
      ...data.slice(editItemIndex + 1),
    ];
    const res = await updateRecord(
      currentUserId,
      id,
      formState.editItemId,
      formState.moneyIn,
      Number(formState.amount),
      formState.reason,
      calculateTotalAmount(newData)
    );
    if (res.status === 200) {
      console.log(res);
      //update total amount if the amount changes
      //find index of the edit item in the data array

      setState({
        ...state,
        data: newData,
        totalAmount: calculateTotalAmount(newData),
      });
      //close form,update ui
      setFormState({
        ...formState,
        showForm: false,
        editItemId: null,
        moneyIn: true,
        amount: "",
        reason: "",
      });
    } else {
      alert(res.msg);
      console.log(res);
    }
  };

  return (
    <Suspense fallback={renderLoader()}>
      <Box>
        {dataLoaded ? (
          <>
            <Container>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <IconButton
                  onClick={() =>
                    setFormState({
                      ...formState,
                      showForm: !formState.showForm,
                    })
                  }
                  aria-label="add new record"
                  color="primary"
                >
                  <AddCircleIcon className={styles.addRecordBtn} />
                </IconButton>
                <Box my={2} textAlign="center">
                  <Typography variant="h2">{dataName && dataName}</Typography>
                  <Typography variant="h1">£{totalAmount}</Typography>
                </Box>
              </Box>
            </Container>
            <List>
              {data &&
                data.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      style={
                        item.moneyIn
                          ? { display: "flex", justifyContent: "flex-end" }
                          : { display: "flex", justifyContent: "flex-start" }
                      }
                    >
                      <Accordion
                        className={`${styles.moneyAction} ${
                          item.moneyIn ? styles.moneyIn : styles.moneyOut
                        }`}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          className={styles.displayContent}
                        >
                          <Typography variant="h5">£{item.amount} </Typography>
                          <Typography variant="body2">
                            {item.createdAt}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          className={`${styles.moneyAction} ${
                            item.moneyIn ? styles.moneyIn : styles.moneyOut
                          }`}
                        >
                          <Typography>{item.reason}</Typography>
                          <Box>
                            <IconButton
                              aria-label="edit"
                              onClick={() => editRecordHandle(item)}
                            >
                              <EditOutlined />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => deleteRecordHandle(item)}
                            >
                              <DeleteOutline />
                            </IconButton>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </ListItem>
                  );
                })}
            </List>
          </>
        ) : (
          <Typography variant="body1" color="primary">
            Loading...
          </Typography>
        )}
        <SwipeableDrawer
          anchor={"right"}
          open={formState.showForm}
          onClose={() =>
            setFormState({
              ...formState,
              showForm: false,
              amount: "",
              reason: "",
              editItemId: null,
              updateRecord: false,
              formTitle: "Add new record",
              textBtn: "Submit",
            })
          }
          onOpen={() => setFormState({ ...formState, showForm: true })}
        >
          <Box p={2}>
            <form className={styles.addRecordForm}>
              <Box my={2}>
                <Typography variant="h4">{formState.formTitle}</Typography>
              </Box>
              <Box my={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formState.moneyIn}
                      onChange={changeHandle}
                      name="moneyIn"
                      color="secondary"
                    />
                  }
                  label="Add in"
                />
              </Box>
              <Box my={2}>
                <TextField
                  name="amount"
                  type="number"
                  onChange={changeHandle}
                  label="Amount"
                  color="secondary"
                  value={formState.amount}
                  fullWidth
                  required
                />
              </Box>
              <Box my={2}>
                <TextField
                  name="reason"
                  type="text"
                  onChange={changeHandle}
                  label="Reason"
                  color="secondary"
                  value={formState.reason}
                  fullWidth
                  required
                />
              </Box>
              <Box my={4}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={
                    formState.updateRecord
                      ? updateRecordHandle
                      : addNewRecordHandle
                  }
                >
                  {formState.textBtn}
                </Button>
              </Box>
            </form>
          </Box>
        </SwipeableDrawer>
      </Box>
    </Suspense>
  );
};

export default Resource;
