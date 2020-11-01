import { List, ListItem, Typography } from "@material-ui/core";
import ResourcesItem from "./ResourcesItem";
import React from "react";

const ResourcesList = ({ data, dataLoaded }) => {
  // const { loaded, data } = useRecoilValue(resourcesState);
  const viewResourcesHandle = (resourceId) => {
    alert(resourceId);
  };
  return (
    <List>
      {dataLoaded && data ? (
        data.length > 0 ? (
          data.map((item, index) => {
            return (
              <ResourcesItem
                key={item.resourceId}
                id={item.resourceId}
                name={item.resourceName}
                totalAmount={item.resourceTotalAmount}
                updatedAt={item.updatedAt}
                viewResourcesHandle={viewResourcesHandle}
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
