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
  addCase,
  deleteCase,
  getCases,
  getCasesError,
  getCasesPagination,
  getCasesStatus,
  getUserQuery,
  selectAllCases,
  setUserQuery,
  updateCase,
} from "../slices/casesSlice";
const Cases = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const cases = useSelector(selectAllCases);
  const pagination = useSelector(getCasesPagination);
  const userQuery = useSelector(getUserQuery);
  const status = useSelector(getCasesStatus);
  const error = useSelector(getCasesError);
  const initialAddValues = {
    doctorName: "",
    phone: "",
    joinAt: format(new Date(Date.now()), "yyyy-MM-dd"),
    location: "",
    comeBy: "",
  };
  const [initialEditValues, setInitialEditValues] = useState({});
  const [doctorId, setCaseId] = useState(null);

  const validationSchema = Yup.object().shape({
    doctorName: Yup.string().required("Please Add Case Name"),
    phone: Yup.string().required("Please Add Case Phone Number"),
    joinAt: Yup.date().required("Please Add Case Join Date"),
    location: Yup.string().required("Please Add Case Location"),
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
  };
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
    setCaseId(id);
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
        addCase({
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
        deleteCase({
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
        updateCase({
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
      dispatch(getCases(query));
    }
  }, [status, dispatch, query]);

  return (
    <>
      {openAddModal && (
        <AddAndEditModal
          title="Add New Case"
          onFormSubmit={onAddFormSubmit}
          onModalClose={onModalClose}
          error={error}
          initialValues={initialAddValues}
          validationSchema={validationSchema}
        />
      )}
      {openEditModal && (
        <AddAndEditModal
          title="Edit Case"
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
      {cases && (
        <Table
          data={cases}
          tableTitle="Cases"
          addButtonTitle="Add Case"
          onAddButtonClick={onAddButtonClick}
          onEditButtonClick={onEditButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
          url="/cases"
          tableHeaders={[
            "ID",
            "Patient Name",
            "Material",
            "Type",
            "Shade",
            "Units",
            "Doctor",
            "actions",
          ]}
          tableRows={[
            "patientName",
            "material",
            "type",
            "shade",
            "units.lowerRight",
            "doctor.data.attributes.doctorName",
          ]}
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

export default Cases;
