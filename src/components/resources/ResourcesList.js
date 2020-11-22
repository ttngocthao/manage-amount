import { List, ListItem } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import React, { lazy, Suspense } from "react";

import { resourcesState } from "../../recoil/resources";
import { useSetRecoilState } from "recoil";

const ResourcesItem = lazy(() => import("./ResourcesItem"));

const renderLoader = () => <p>Loading</p>;

const ResourcesList = ({
  data,
  dataLoaded,
  deleteResourceHandle,
  editResourceBtnHandle,
}) => {
  const history = useHistory();
  const location = useLocation();

  const setResourcesState = useSetRecoilState(resourcesState);

  const viewResourcesHandle = async (resourceId, name) => {
    const url = location.pathname;
    //use recoil - show back btn on resource detail page
    setResourcesState((prevState) => {
      return { ...prevState, atResourceDetailsPage: true };
    });

    history.push(`${url}/${resourceId}?name=${name}`);
  };

  return (
    <Suspense fallback={renderLoader()}>
      <List>
        {dataLoaded &&
          data &&
          (data.length > 0 ? (
            data.map((item, index) => {
              return (
                <ResourcesItem
                  key={item.resourceId}
                  id={item.resourceId}
                  name={item.resourceName}
                  totalAmount={item.resourceTotalAmount}
                  updatedAt={item.updatedAt}
                  viewResourcesHandle={viewResourcesHandle}
                  deleteResourceHandle={deleteResourceHandle}
                  editResourceBtnHandle={editResourceBtnHandle}
                />
              );
            })
          ) : (
            <ListItem>No resources yet</ListItem>
          ))}
      </List>
    </Suspense>
  );
};

export default ResourcesList;
