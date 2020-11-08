import { Box } from "@material-ui/core";
import React, { lazy, useEffect, useState, Suspense } from "react";
//import ResourcesList from "../components/resources/ResourcesList";
//import Total from "../components/total/Total";

import { getAllResources } from "../actions/resources";

const ResourcesList = lazy(() =>
  import("../components/resources/ResourcesList")
);
const Total = lazy(() => import("../components/total/Total"));

const renderLoader = () => <p>Loading</p>;

const Dashboard = () => {
  const [dashboardState, setdashboardState] = useState({
    dataLoaded: false,
    data: [],
    totalAmount: 0,
  });
  const { dataLoaded, data, totalAmount } = dashboardState;
  useEffect(() => {
    (async () => {
      const res = await getAllResources();
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
  return (
    <Suspense fallback={renderLoader()}>
      <Box>
        <Total totalAmount={totalAmount} />
        <ResourcesList data={data} dataLoaded={dataLoaded} />
      </Box>{" "}
    </Suspense>
  );
};

export default Dashboard;
