import { Box } from "@material-ui/core";
import React from "react";
import ResourcesList from "../components/resources/ResourcesList";
import Total from "../components/total/Total";

const Dashboard = () => {
  return (
    <Box>
      <Total totalAmount={100} />
      <ResourcesList />
    </Box>
  );
};

export default Dashboard;
