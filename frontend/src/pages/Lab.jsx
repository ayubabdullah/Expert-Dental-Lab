import React from "react";
import { useParams } from "react-router-dom";

const Lab = () => {
  const { labId } = useParams();
  console.log(labId);
  return <div>lab {labId}</div>;
};

export default Lab;
