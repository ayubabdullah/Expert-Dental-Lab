import { format } from "date-fns";
import { useFormik } from "formik";
import React from "react";
import FormInput from "./FormInput";

const AddAndEditModal = ({
  title,
  onFormSubmit,
  onModalClose,
  error,
  initialValues,
  validationSchema,
}) => {
  const { handleSubmit, handleChange, values, touched, errors, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: onFormSubmit,
    });
  return (
    <div className="flex  justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <button
            type="button"
            onClick={onModalClose}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <div className="py-6 px-6 lg:px-8">
            {error && (
              <div className="bg-red-500 py-2 px-4 mt-5 rounded-xl text-white">
                {error}
              </div>
            )}
            <h3 className="mb-4 text-xl font-medium text-gray-900 ">{title}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                type="hidden"
                name="id"
                value={values.id}
                handleChange={handleChange}
              />
              <FormInput
                type="text"
                label="Doctor Name"
                name="doctorName"
                value={values.doctorName ? values.doctorName : ""}
                placeholder="Doctor Name"
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
              <FormInput
                type="text"
                label="Phone Number"
                name="phone"
                value={values.phone ? values.phone : ""}
                placeholder="Phone Number"
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
              <FormInput
                type="date"
                label="Join At"
                name="joinAt"
                value={
                  values.joinAt
                    ? values.joinAt
                    : format(new Date(Date.now()), "yyyy-MM-dd")
                }
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
              <FormInput
                type="text"
                label="Location"
                name="location"
                value={values.location ? values.location : ""}
                placeholder="Location"
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />
              <FormInput
                label="Come By"
                name="comeBy"
                value={values.comeBy ? values.comeBy : ""}
                placeholder="Come By"
                handleChange={handleChange}
                touched={touched}
                errors={errors}
              />

              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                disabled={isSubmitting}
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAndEditModal;
