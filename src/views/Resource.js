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
          // console.log(res);
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
    const total = dataArr.reduce(
      (current, obj) => current + obj.amount * (obj.moneyIn ? 1 : -1),
      0
    );
    return Math.floor(total * 100) / 100;
  };

  const addNewRecordHandle = async () => {
    let reCalculateTotalAmount;
    if (formState.moneyIn) {
      reCalculateTotalAmount = Number(totalAmount) + Number(formState.amount);
    } else {
      reCalculateTotalAmount = Number(totalAmount) - Number(formState.amount);
    }
    // console.log("check", reCalculateTotalAmount);
    const res = await addNewRecord(
      dataName,
      id,
      Number(formState.amount),
      currentUserId,
      formState.moneyIn,
      formState.reason,
      Math.floor(reCalculateTotalAmount * 1000) / 1000
    );

    //update ui
    if (res.status === 200) {
      const newRecord = {
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
    alert(res.msg);
    console.log(res);
  };

  const editRecordHandle = async (recordItem) => {
    alert("edit " + recordItem.recordId);
    console.log(recordItem, totalAmount);
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

                      // onClick={()=>console.log(item.amount,item.id,item.moneyIn,item.resourceId,item.owner)}
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
          onClose={() => setFormState({ ...formState, showForm: false })}
          onOpen={() => setFormState({ ...formState, showForm: true })}
        >
          <Box p={2}>
            <form className={styles.addRecordForm}>
              <Box my={2}>
                <Typography variant="h4">Add new record</Typography>
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
                  onClick={addNewRecordHandle}
                >
                  Submit
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
