// src/components/LoanDetailsForm.js

import React, { useState } from 'react';

const LoanDetailsForm = ({ onSubmit }) => {
  // State to manage form data
  const [loanDetails, setLoanDetails] = useState({
    LoanID: '',
    Age: 0,
    Income: 0,
    LoanAmount: 0,
    CreditScore: 0,
    MonthsEmployed: 0,
    NumCreditLines: 0,
    InterestRate: 0.0,
    LoanTerm: 0,
    DTIRatio: 0.0,
    Education: '',
    EmploymentType: '',
    MaritalStatus: '',
    HasMortgage: '',
    HasDependents: '',
    LoanPurpose: '',
    HasCoSigner: '',
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the loan details to the parent component
    onSubmit(loanDetails);
    // Reset form fields after submission
    setLoanDetails({
      LoanID: '',
      Age: 0,
      Income: 0,
      LoanAmount: 0,
      CreditScore: 0,
      MonthsEmployed: 0,
      NumCreditLines: 0,
      InterestRate: 0.0,
      LoanTerm: 0,
      DTIRatio: 0.0,
      Education: '',
      EmploymentType: '',
      MaritalStatus: '',
      HasMortgage: '',
      HasDependents: '',
      LoanPurpose: '',
      HasCoSigner: '',
    });
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className=" mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Loan Details</h2>
      <button className='px-4 py-2 rounded-md bg-primHover hover:bg-meta-6'>Auto Fill Random</button>
      <form onSubmit={handleSubmit} className='grid gap-4 grid-cols-2 md:grid-cols-3'>
        {Object.entries(loanDetails).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
              {key}
            </label>
            {key === 'Education' ||
            key === 'EmploymentType' ||
            key === 'MaritalStatus' ||
            key === 'HasMortgage' ||
            key === 'HasDependents' ||
            key === 'LoanPurpose' ||
            key === 'HasCoSigner' ? (
              <select
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              >
                <option value="">Select an option</option>
                {key === 'Education' && (
                  <>
                    <option value="PhD">PhD</option>
                    <option value="Master's">Master's</option>
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="High School">High School</option>
                  </>
                )}
                {key === 'EmploymentType' && (
                  <>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Self-employed">Self-employed</option>
                    <option value="Unemployed">Unemployed</option>
                  </>
                )}
                {key === 'MaritalStatus' && (
                  <>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                  </>
                )}
                {key === 'HasMortgage' && (
                  <>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </>
                )}
                {key === 'HasDependents' && (
                  <>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </>
                )}
                {key === 'LoanPurpose' && (
                  <>
                    <option value="Home">Home</option>
                    <option value="Auto">Auto</option>
                    <option value="Education">Education</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </>
                )}
                {key === 'HasCoSigner' && (
                  <>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </>
                )}
              </select>
            ) : (
              <input
                type={key === 'LoanID' ? 'text' : key === 'Education' ? 'text' : 'number'}
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
            Add Loan Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanDetailsForm;
