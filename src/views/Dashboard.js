import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ResourcesList from "../components/resources/ResourcesList";
import Total from "../components/total/Total";
import { getAllResources } from "../actions/resources";

const Dashboard = () => {
  const [dashboardState, setdashboardState] = useState({
    dataLoaded: false,
    data: null,
    totalAmount: null,
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
  }, []);
  return (
    <Box>
      <Total totalAmount={totalAmount ? totalAmount : "Loading..."} />
      <ResourcesList data={data} dataLoaded={dataLoaded} />
    </Box>
  );
};

export default Dashboard;
