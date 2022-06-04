import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctors,
  selectAllDoctors,
  getDoctorsStatus,
  getDoctorsError,
  addDoctor,
} from "../slices/doctorsSlice";
const Doctors = () => {
  const doctors = useSelector(selectAllDoctors);
  const status = useSelector(getDoctorsStatus);
  const error = useSelector(getDoctorsError);
  const dispatch = useDispatch();

  const onFormSubmit = () => {
    try {
      dispatch(
        addDoctor({
          data: {
            doctorName: "Amanj",
            joinAt: "2022-05-01",
            location: "Erbil",
          },
        })
      ).unwrap();
    } catch (error) {
      console.error('can not add');
    }
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(getDoctors());
    }
  }, [status, dispatch]);

  return (
    <>
      {doctors ? (
        doctors.map((doctor) => {
          return <div key={doctor.id}>{doctor.attributes.doctorName}</div>;
        })
      ) : (
        <div>no doctors</div>
      )}
      {error ? <div>{error}</div> : null}
      {status ? <div>{status}</div> : null}
      <button onClick={onFormSubmit}>Add Doctor</button>
    </>
  );
};

export default Doctors;
