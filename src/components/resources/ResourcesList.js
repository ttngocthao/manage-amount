import { List, ListItem, Typography } from "@material-ui/core";
//import ResourcesItem from "./ResourcesItem";
import { useHistory, useLocation } from "react-router-dom";
import React, { lazy } from "react";
import { useSetRecoilState } from "recoil";
import { resourcesState } from "../../recoil/resources";
import { useRecoilState } from "recoil";

const ResourcesItem = lazy(() => import("./ResourcesItem"));

const ResourcesList = ({ data, dataLoaded }) => {
  const history = useHistory();
  const location = useLocation();
  // const { loaded, data } = useRecoilValue(resourcesState);
  const [localResourcesState, setResourcesState] = useRecoilState(
    resourcesState
  );

  const viewResourcesHandle = async (resourceId, name) => {
    const url = location.pathname;
    //use recoil - show back btn on resource detail page
    setResourcesState((prevState) => {
      return { ...prevState, atResourceDetailsPage: true };
    });

    history.push(`${url}/${resourceId}?name=${name}`);
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
