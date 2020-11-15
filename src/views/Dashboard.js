import { Box, Button, makeStyles } from "@material-ui/core";
import React, { lazy, useEffect, useState, Suspense } from "react";
//import ResourcesList from "../components/resources/ResourcesList";
//import Total from "../components/total/Total";

import {
  getAllResources,
  addResource,
  deleteResource,
} from "../actions/resources";
import AddNewResource from "../components/resources/AddNewResource";

const ResourcesList = lazy(() =>
  import("../components/resources/ResourcesList")
);
const Total = lazy(() => import("../components/total/Total"));

const renderLoader = () => <p>Loading</p>;

const useStyles = makeStyles((theme) => ({
  addResourceBtn: {
    width: "95%",
    margin: "0 auto",
    borderRadius: "8px",
    minHeight: "100px",
    display: "block",
    backgroundColor: `rgba(85,204,212,.7)`,
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
  });
  const {
    dataLoaded,
    data,
    totalAmount,
    addNewResourceFormOpened,
  } = dashboardState;
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
    });
  };
  const addResourceHandle = async (resourceName) => {
    if (resourceName === "") {
      alert("Name cannot be empty");
      return;
    }
    //add resources
    const res = await addResource(currentUserId, resourceName);

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

  return (
    <Suspense fallback={renderLoader()}>
      <Box>
        <Total totalAmount={totalAmount} />
        <Button
          variant="contained"
          onClick={addNewResourceBtnHandle}
          className={styles.addResourceBtn}
        >
          Add new resource
        </Button>
        <ResourcesList
          data={data}
          dataLoaded={dataLoaded}
          deleteResourceHandle={deleteResourceHandle}
        />
      </Box>
      <AddNewResource
        open={addNewResourceFormOpened}
        handleClose={closeFormHandle}
        addResourceHandle={addResourceHandle}
      />
    </Suspense>
  );
};

export default Dashboard;
