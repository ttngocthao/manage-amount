import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  List,
  ListItem,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { getResourceDetails } from "../actions/resources";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const dummyData = [
  {
    amount: 200,
    createdAt: "Fri Oct 02 2020",
    moneyIn: true,
    reason: "Monthly Saving",
  },
  {
    amount: 50,
    createdAt: "Sun Nov 01 2020",
    moneyIn: false,
    reason: "bought new clothe",
  },
];
const useStyles = makeStyles((theme) => ({
  moneyAction: {
    color: "#333",
    borderColor: "white",
    justifyContent: "flex-start",
    minWidth: "250px",
  },
  moneyIn: {
    backgroundColor: "#4CB3B2",
    marginLeft: "auto",
  },

  moneyOut: {
    backgroundColor: "#FE7E80",
  },
  expanded: {
    marginLeft: "auto",
  },
}));

const Resource = ({ props }) => {
  const styles = useStyles();
  const { id } = useParams();
  const [state, setState] = useState({
    dataLoaded: false,
    data: null,
    dataName: null,
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
    // (async () => {
    //   const res = await getResourceDetails(id);
    //   if (res.status === 200) {
    //     setState({
    //       ...state,
    //       dataLoaded: true,
    //       data: res.data,
    //       dataName: res.dataName,
    //       totalAmount: calculateTotalAmount(res.data)
    //     });
    //   } else {
    //     console.log(res);
    //   }
    // })();
    setState({
      dataLoaded: true,
      data: dummyData,
      dataName: "My saving",
      totalAmount: calculateTotalAmount(dummyData),
    });
  }, []);

  const calculateTotalAmount = (dataArr) => {
    const total = dataArr.reduce((current, obj) => current + obj.amount, 0);
    return total;
  };

  return (
    <Box>
      {dataLoaded ? (
        <>
          <Container>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                onClick={() =>
                  setFormState({ ...formState, showForm: !formState.showForm })
                }
                variant="contained"
                color="primary"
                style={{
                  color: "#333",
                  textTransform: "none",
                  backgroundColor: "#FFAC88",
                  height: "50px",
                }}
              >
                Add Record
              </Button>

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
                      >
                        <Typography>£{item.amount}</Typography>
                        <Typography>{item.createdAt}</Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        className={`${styles.moneyAction} ${
                          item.moneyIn ? styles.moneyIn : styles.moneyOut
                        }`}
                      >
                        <Typography>{item.reason}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>
                  // <ListItem key={index}>
                  //   <Chip
                  //     className={`${styles.moneyAction} ${
                  //       item.moneyIn ? styles.moneyIn : styles.moneyOut
                  //     }`}
                  //     avatar={
                  //       <Avatar style={{ backgroundColor: "white" }}>
                  //         {item.moneyIn ? (
                  //           <AddCircleIcon />
                  //         ) : (
                  //           <RemoveCircleIcon />
                  //         )}
                  //       </Avatar>
                  //     }
                  //     label={`£${item.amount} - ${item.reason}`}
                  //     // clickable
                  //     color="primary"
                  //     //onDelete={handleDelete}
                  //     // deleteIcon={<DoneIcon />}
                  //     variant="outlined"
                  //   />
                  // </ListItem>
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
        <Typography>Testing</Typography>
      </SwipeableDrawer>
    </Box>
  );
};

export default Resource;
