import { format } from "date-fns";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import AddAndEditModal from "../components/AddAndEditModal";
import Center from "../components/Center";
import DeleteModal from "../components/DeleteModal";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import Table from "../components/Table";
import {
  addDoctor,
  deleteDoctor,
  getDoctors,
  getDoctorsError,
  getDoctorsPagination,
  getDoctorsStatus,
  getUserQuery,
  selectAllDoctors,
  setUserQuery,
  updateDoctor
} from "../slices/doctorsSlice";
const Doctors = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const doctors = useSelector(selectAllDoctors);
  const pagination = useSelector(getDoctorsPagination);
  const userQuery = useSelector(getUserQuery);
  const status = useSelector(getDoctorsStatus);
  const error = useSelector(getDoctorsError);
  const initialAddValues = {
    doctorName: "",
    phone: "",
    joinAt: format(new Date(Date.now()), "yyyy-MM-dd"),
    location: "",
    comeBy: "",
  };
  const [initialEditValues, setInitialEditValues] = useState({});
  const [doctorId, setDoctorId] = useState(null);

  const validationSchema = Yup.object().shape({
    doctorName: Yup.string().required("Please Add Doctor Name"),
    phone: Yup.string().required("Please Add Doctor Phone Number"),
    joinAt: Yup.date().required("Please Add Doctor Join Date"),
    location: Yup.string().required("Please Add Doctor Location"),
    comeBy: Yup.string(),
  });
  const onAddButtonClick = () => {
    setOpenAddModal(true);
  };
  const onSearchTermChange = (term) => {
    setSearchTerm(term);
    
  };
  const onSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(
      setUserQuery({
        pagination,
        sort: ["createdAt:desc"],
        filters: {
          $or: [
            {
              doctorName: {
                $containsi: searchTerm,
              },
            },
            {
              phone: {
                $containsi: searchTerm,
              },
            },
            {
              location: {
                $containsi: searchTerm,
              },
            },
            {
              comeBy: {
                $containsi: searchTerm,
              },
            },
          ],
        },
      })
    );
  }
  const onEditButtonClick = ({ id, attributes }) => {
    setInitialEditValues({
      id,
      doctorName: attributes.doctorName,
      phone: attributes.phone,
      joinAt: attributes.joinAt,
      location: attributes.location,
      comeBy: attributes.comeBy,
    });
    setOpenEditModal(true);
  };
  const onDeleteButtonClick = (id) => {
    setDoctorId(id);
    setOpenDeleteModal(true);
  };

  const onModalClose = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
  };
  const onAddFormSubmit = ({ doctorName, phone, joinAt, location, comeBy }) => {
    try {
      dispatch(
        addDoctor({
          data: {
            doctorName,
            phone,
            joinAt,
            location,
            comeBy,
          },
          callback: onModalClose,
        })
      ).unwrap();
    } catch (error) {
      console.error("can not add");
    }
  };
  const onDeleteClick = () => {
    try {
      dispatch(
        deleteDoctor({
          doctorId,
          callback: onModalClose,
        })
      ).unwrap();
    } catch (error) {
      console.error("can not delete");
    }
  };
  const onEditFormSubmit = ({
    id,
    doctorName,
    phone,
    joinAt,
    location,
    comeBy,
  }) => {
    try {
      dispatch(
        updateDoctor({
          id,
          data: {
            data: {
              doctorName,
              phone,
              joinAt,
              location,
              comeBy,
            },
          },
          callback: onModalClose,
        })
      ).unwrap();
    } catch (error) {
      console.error("can not add");
    }
  };
  const query = qs.stringify(userQuery, {
    encodeValuesOnly: true,
  });
  useEffect(() => {
    if (status === "idle") {
      dispatch(getDoctors(query));
    }
  }, [status, dispatch, query]);

  return (
    <>
      {openAddModal && (
        <AddAndEditModal
          title="Add New Doctor"
          onFormSubmit={onAddFormSubmit}
          onModalClose={onModalClose}
          error={error}
          initialValues={initialAddValues}
          validationSchema={validationSchema}
        />
      )}
      {openEditModal && (
        <AddAndEditModal
          title="Edit Doctor"
          onFormSubmit={onEditFormSubmit}
          onModalClose={onModalClose}
          error={error}
          initialValues={initialEditValues}
          validationSchema={validationSchema}
        />
      )}
      {openDeleteModal && (
        <DeleteModal
          itemTitle="doctor"
          onDeleteClick={onDeleteClick}
          onModalClose={onModalClose}
          error={error}
        />
      )}
      {doctors && (
        <Table
          data={doctors}
          tableTitle="Doctors"
          addButtonTitle="Add Doctor"
          onAddButtonClick={onAddButtonClick}
          onEditButtonClick={onEditButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
          url="/doctors"
          tableHeaders={[
            "ID",
            "Doctor Name",
            "Phone Number",
            "Location",
            "Join At",
            "Come By",
            "actions",
          ]}
          tableRows={["doctorName", "phone", "location", "joinAt", "comeBy"]}
          pagination={pagination}
          onSearchTermChange={onSearchTermChange}
          searchTerm={searchTerm}
          onSearchSubmit={onSearchSubmit}
        />
      )}
      {status === "loading" && (
        <Center>
          <Spinner />
        </Center>
      )}
      {error && (
        <Center>
          <Error message={`Something goes wrong: ${error}`} />
        </Center>
      )}
    </>
  );
};

export default Doctors;
