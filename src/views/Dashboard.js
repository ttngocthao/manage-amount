import { Box, Button, makeStyles } from "@material-ui/core";
import React, { lazy, useEffect, useState, Suspense } from "react";
//import ResourcesList from "../components/resources/ResourcesList";
//import Total from "../components/total/Total";
import Loading from "../components/loading/Loading";
import {
  getAllResources,
  addResource,
  deleteResource,
  editResource,
} from "../actions/resources";
import AddNewResource from "../components/resources/AddNewResource";

const ResourcesList = lazy(() =>
  import("../components/resources/ResourcesList")
);
const Total = lazy(() => import("../components/total/Total"));

const renderLoader = () => <Loading />;

const useStyles = makeStyles((theme) => ({
  addResourceBtn: {
    width: "95%",
    margin: "0 auto",
    borderRadius: "8px",
    minHeight: "100px",
    display: "block",
    fontWeight: "bold",
    fontSize: "1rem",
    "& .MuiButton-label": {
      textTransform: "none",
    },
    "&.MuiButton-containedPrimary:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const Dashboard = () => {
  const styles = useStyles();
  const currentUserId = localStorage.getItem("uid");
  const [dashboardState, setdashboardState] = useState({
    dataLoaded: false,
    data: [],
    totalAmount: 0,
    addNewResourceFormOpened: false,
    itemInView: null,
    inputText: "",
  });
  const {
    dataLoaded,
    data,
    totalAmount,
    addNewResourceFormOpened,
    itemInView,
    inputText,
  } = dashboardState;
  const onChangeHandle = (e) => {
    setdashboardState({ ...dashboardState, inputText: e.target.value });
  };
  useEffect(() => {
    (async () => {
      const res = await getAllResources(currentUserId);
      if (res.status === 200) {
        const totalAmount = res.data.reduce(
          (preValue, currentItem) => preValue + currentItem.resourceTotalAmount,
          0
        );
        //set atResourcePage at recoil to false

        //
        setdashboardState({
          ...dashboardState,
          dataLoaded: true,
          data: res.data,
          totalAmount,
        });
      } else {
        console.log(res);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addNewResourceBtnHandle = () => {
    setdashboardState({ ...dashboardState, addNewResourceFormOpened: true });
  };
  const closeFormHandle = () => {
    setdashboardState({
      ...dashboardState,
      addNewResourceFormOpened: false,
      itemInView: null,
      inputText: "",
    });
  };
  const addResourceHandle = async () => {
    if (inputText === "") {
      alert("Name cannot be empty");
      return;
    }
    //add resources
    const res = await addResource(currentUserId, inputText);

    //close form and update ui
    setdashboardState({
      ...dashboardState,
      data: [...data, res.newItem],
      addNewResourceFormOpened: false,
    });
  };

  const deleteResourceHandle = async (resourceId) => {
    //alert(resourceId);
    const res = await deleteResource(currentUserId, resourceId);
    if (res.status === 200) {
      const newData = data.filter((item) => item.resourceId !== resourceId);
      const totalAmount = newData.reduce(
        (preValue, currentItem) => preValue + currentItem.resourceTotalAmount,
        0
      );
      setdashboardState({
        ...dashboardState,
        data: newData,
        totalAmount,
      });
    }
    console.log(res);
  };

  const editResourceHandle = async () => {
    const res = await editResource(itemInView.resourceId, inputText);
    if (res.status === 200) {
      //find index of the resource in the data list
      const editItemIndex = data
        .map((item) => item.resourceId)
        .indexOf(itemInView.resourceId);
      const newData = [
        ...data.slice(0, editItemIndex),
        {
          ...data.slice(editItemIndex, editItemIndex + 1)[0],
          resourceName: inputText,
        },
        ...data.slice(editItemIndex + 1),
      ];
      setdashboardState({
        ...dashboardState,
        data: newData,
        addNewResourceFormOpened: false,
        itemInView: null,
        inputText: "",
      });
    } else {
      alert(res.msg);
      console.log(res);
    }
  };

  const editResourceBtnHandle = (resourceId) => {
    const editItem = data.filter((item) => item.resourceId === resourceId)[0];
    setdashboardState({
      ...dashboardState,
      addNewResourceFormOpened: true,
      itemInView: editItem,
      inputText: editItem.resourceName,
    });
  };

  return (
    <Suspense fallback={renderLoader()}>
      <Box>
        <Total totalAmount={totalAmount} />

        <ResourcesList
          data={data}
          dataLoaded={dataLoaded}
          deleteResourceHandle={deleteResourceHandle}
          editResourceBtnHandle={editResourceBtnHandle}
        />
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={addNewResourceBtnHandle}
          className={styles.addResourceBtn}
        >
          New Resource
        </Button>
      </Box>
      <AddNewResource
        open={addNewResourceFormOpened}
        handleClose={closeFormHandle}
        addResourceHandle={addResourceHandle}
        editResourceHandle={editResourceHandle}
        itemInView={itemInView}
        inputText={inputText}
        onChangeHandle={onChangeHandle}
      />
    </Suspense>
  );
};

export default Dashboard;
