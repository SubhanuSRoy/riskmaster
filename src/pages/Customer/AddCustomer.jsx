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
    const isNumericField = ['Age', 'Income', 'LoanAmount', 'CreditScore', 'MonthsEmployed', 'NumCreditLines', 'InterestRate', 'LoanTerm', 'DTIRatio'].includes(name);
  
    const numericValue = isNumericField ? parseFloat(value) : value;
  
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: isNaN(numericValue) ? value : numericValue, // Handle NaN values
    }));
  };

  return (
    <div className=" mx-auto rounded-md p-6 bg-white shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Customer</h2>
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
