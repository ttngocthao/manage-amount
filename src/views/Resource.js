import React from "react";
import { useParams } from "react-router-dom";
const Resource = ({ props }) => {
  const params = useParams();
  console.log("params", params);
  return <div>RESOURCE</div>;
};

export default Resource;
