import React from 'react'
import { useParams } from 'react-router-dom';

const Doctor = () => {
  const { doctorId } = useParams();
  return <div>doctor {doctorId}</div>;
}

export default Doctor