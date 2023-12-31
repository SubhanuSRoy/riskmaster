// src/components/AddCustomer.js

import axios from "axios";
import React, { useState } from "react";

const AddCustomer = () => {
  // State to manage form data
  const [customerData, setCustomerData] = useState({
    LoanID: "",
    Name: "",
    Age: 0,
    Income: 0,
    LoanAmount: 0,
    CreditScore: 0,
    NumCreditLines: 0,
    MonthsEmployed: 0,
    InterestRate: 0.0,
    LoanTerm: 0,
    DTIRatio: 0.0,
    Education: "",
    EmploymentType: "",
    MaritalStatus: "",
    HasMortgage: "",
    HasDependents: "",
    LoanPurpose: "",
    HasCoSigner: "",
  });

  // State to manage customer IDs file
  const [custIds, setCustIds] = useState(null);
  const [idData, setIdData] = useState(null);

  // State to manage customer documents file
  const [custDocs, setCustDocs] = useState(null);
  const [docData, setDocData] = useState(null);

  // Function to handle customer IDs file input
  const handleCustIdsChange = (e) => {
    const file = e.target.files[0];
    setCustIds(file);
  };

  const [loading, setLoading] = useState(false);

  // Function to handle customer documents file input
  const handleCustDocsChange = (e) => {
    const file = e.target.files[0];
    setCustDocs(file);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(customerData);
    axios
      .post(process.env.REACT_APP_BACKEND + "store_user_data/", customerData)
      .then((res) => {
        console.log(res);
        alert("Customer added successfully!");
      })
      .catch((err) => {
        console.log(err);
        alert("Error adding customer!");
      });

    // Reset form fields after submission
    // setCustomerData({
    //   LoanID: "",
    //   Name: "",
    //   Age: 0,
    //   Income: 0,
    //   LoanAmount: 0,
    //   CreditScore: 0,
    //   MonthsEmployed: 0,
    //   InterestRate: 0.0,
    //   LoanTerm: 0,
    //   DTIRatio: 0.0,
    //   Education: "",
    //   EmploymentType: "",
    //   MaritalStatus: "",
    //   HasMortgage: "",
    //   HasDependents: "",
    //   LoanPurpose: "",
    //   HasCoSigner: "",
    // });
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumericField = [
      "Age",
      "Income",
      "LoanAmount",
      "CreditScore",
      "MonthsEmployed",
      "NumCreditLines",
      "InterestRate",
      "LoanTerm",
      "DTIRatio",
    ].includes(name);

    const numericValue = isNumericField ? parseFloat(value) : value;

    setCustomerData((prevData) => ({
      ...prevData,
      [name]: isNaN(numericValue) ? value : numericValue, // Handle NaN values
    }));
  };

  const handleUploadID = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      if (custIds) {
        formData.append("file", custIds);
        formData.append(
          "text",
          "Please analyze the provided personal ID card. Offer a concise description of the document, highlighting key information. Additionally, assess and comment on its authenticity, determining whether it is a genuine or a forged ID card."
        );
      }

      const response = await axios
        .post(process.env.REACT_APP_BACKEND + "image_analysis/", formData)
        .then((res) => {
          console.log("Upload successful:", res.data);
          setIdData(res?.data?.response);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error uploading files:", error.message);
      setLoading(false);
    }
  };

  const handleUploadDoc = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      if (custDocs) {
        formData.append("file", custDocs);
      }

      const response = await axios
        .post(process.env.REACT_APP_BACKEND + "pdf_loan_analysis/", formData)
        .then((res) => {
          console.log("Upload successful:", res);
          setDocData(res?.data?.important_info);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error uploading files:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className=" mx-auto rounded-md p-6 bg-white shadow-md">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-semibold mb-4">Add Customer</h2>
        {loading && (
          <img
            src="https://cdn.dribbble.com/users/2973561/screenshots/5757826/loading__.gif"
            className="h-10"
          />
        )}
      </div>

      {/* Add file inputs for customer IDs and documents */}
      <div className="mb-4 w-full flex items-center gap-4">
        <label className="w-1/4 block text-gray-700 text-sm font-bold mb-2">
          Customer ID (image)
        </label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleCustIdsChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <button
          className="w-1/3 bg-yellow-500 rounded-md px-3 py-2"
          onClick={handleUploadID}
        >
          Upload ID
        </button>
      </div>

      <div className="mb-4 w-full flex items-center gap-4">
        <label className="w-1/4 block text-gray-700 text-sm font-bold mb-2">
          Customer Document (PDF)
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleCustDocsChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <button
          className="w-1/3 bg-yellow-500 rounded-md px-3 py-2"
          onClick={handleUploadDoc}
        >
          Upload Doc
        </button>
      </div>

      <div className="flex w-full items-center justify-around gap-4 my-4 bg-gray-100 rounded-md p-4">
        {idData && (
          <details className="w-1/2">
            <summary>View ID Analysis</summary>
            <div className="text-gray-700">{idData}</div>
          </details>
        )}
        {docData && (
          <details className="w-1/2">
            <summary>View Doc Analysis</summary>
            <div className="text-gray-700">{docData}</div>
          </details>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-2 grid-cols-2 md:grid-cols-3"
      >
        {Object.entries(customerData).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={key}
            >
              {key}
            </label>
            {key === "Education" ||
            key === "EmploymentType" ||
            key === "MaritalStatus" ||
            key === "HasMortgage" ||
            key === "HasDependents" ||
            key === "LoanPurpose" ||
            key === "HasCoSigner" ? (
              <select
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              >
                <option value="">Select an option</option>
                {key === "Education" && (
                  <>
                    <option value="PhD">PhD</option>
                    <option value="Master's">Master's</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="High School">High School</option>
                  </>
                )}
                {key === "EmploymentType" && (
                  <>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Self-employed">Self-employed</option>
                    <option value="Unemployed">Unemployed</option>
                  </>
                )}
                {key === "MaritalStatus" && (
                  <>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                  </>
                )}
                {key === "HasMortgage" && (
                  <>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </>
                )}
                {key === "HasDependents" && (
                  <>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </>
                )}
                {key === "LoanPurpose" && (
                  <>
                    <option value="Home">Home</option>
                    <option value="Auto">Auto</option>
                    <option value="Education">Education</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </>
                )}
                {key === "HasCoSigner" && (
                  <>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </>
                )}
              </select>
            ) : (
              <input
                type={key === "LoanID" || key === "Name" ? "text" : "number"}
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            )}
          </div>
        ))}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          >
            Add Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
