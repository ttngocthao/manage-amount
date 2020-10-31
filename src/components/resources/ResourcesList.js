import { List, ListItem, Typography } from "@material-ui/core";
import ResourcesItem from "./ResourcesItem";
import React from "react";
const data = [
  { name: "A", totalAmount: "B", updatedAt: "C" },
  { name: "A", totalAmount: "B", updatedAt: "C" },
  { name: "A", totalAmount: "B", updatedAt: "C" },
  { name: "A", totalAmount: "B", updatedAt: "C" },
  { name: "A", totalAmount: "B", updatedAt: "C" },
];
const ResourcesList = () => {
  return (
    <List>
      {data ? (
        data.length > 0 ? (
          data.map((item, index) => {
            return (
              <ResourcesItem
                key={index}
                name={item.name}
                totalAmount={item.totalAmount}
                updatedAt={item.updatedAt}
              />
            );
          })
        ) : (
          <ListItem>No resources yet</ListItem>
        )
      ) : (
        <Typography color="primary">Loading...</Typography>
      )}
    </List>
  );
};

export default ResourcesList;
