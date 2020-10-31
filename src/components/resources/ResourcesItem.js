import { ListItem, Typography } from "@material-ui/core";
import React from "react";

const ResourcesItem = ({ name, totalAmount, updatedAt }) => {
  return (
    <ListItem>
      <Typography>{name}</Typography>
      <Typography>£ {totalAmount}</Typography>
      <Typography>Updated at: {updatedAt}</Typography>
    </ListItem>
  );
};

export default ResourcesItem;
