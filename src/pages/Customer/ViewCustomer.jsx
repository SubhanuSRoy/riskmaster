// src/components/ViewCustomer.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewCustomer = () => {
  // get the load id from the url
  const { LoanID } = useParams();

  const [customer, setCustomer] = useState(null);

  const [defaulter, setDefaulter] = useState(null);
  const [defaulterLoading, setDefaulterLoading] = useState(false);

  // Function to fetch customeromers data from the API
  const getCustomer = () => {
    axios
      .post(process.env.REACT_APP_BACKEND + "get_user_data/", {
        LoanID: LoanID,
      })
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        console.log(err);
        // Handle error as needed
      });
  };

  // Fetch customeromers data on component mount
  useEffect(() => {
    getCustomer();
  }, []);

  // function to predict whether the customer is a defaulter or not
  const onPredictDefaulter = () => {
    setDefaulterLoading(true);
    console.log({
      LoanID: customer?.LoanID,
      Age: customer?.Age,
      Income: customer?.Income,
      LoanAmount: customer?.LoanAmount,
      CreditScore: customer?.CreditScore,
      MonthsEmployed: customer?.MonthsEmployed,
      NumCreditLines: customer?.NumCreditLines,
      InterestRate: customer?.InterestRate,
      LoanTerm: customer?.LoanTerm,
      DTIRatio: customer?.DTIRatio,
      Education: customer?.Education,
      EmploymentType: customer?.EmploymentType,
      MaritalStatus: customer?.MaritalStatus,
      HasMortgage: customer?.HasMortgage,
      HasDependents: customer?.HasDependents,
      LoanPurpose: customer?.LoanPurpose,
      HasCoSigner: customer?.HasCoSigner,
    });
    axios
      .post(process.env.REACT_APP_BACKEND + "predict_loan/", {
        LoanID: customer?.LoanID,
        Age: customer?.Age,
        Income: customer?.Income,
        LoanAmount: customer?.LoanAmount,
        CreditScore: customer?.CreditScore,
        MonthsEmployed: customer?.MonthsEmployed,
        NumCreditLines: customer?.NumCreditLines,
        InterestRate: customer?.InterestRate,
        LoanTerm: customer?.LoanTerm,
        DTIRatio: customer?.DTIRatio,
        Education: customer?.Education,
        EmploymentType: customer?.EmploymentType,
        MaritalStatus: customer?.MaritalStatus,
        HasMortgage: customer?.HasMortgage,
        HasDependents: customer?.HasDependents,
        LoanPurpose: customer?.LoanPurpose,
        HasCoSigner: customer?.HasCoSigner,
      })
      .then((res) => {
        setDefaulter(res.data);
        setDefaulterLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setDefaulterLoading(false);
      });
  };
  return (
    <div className="p-8 bg-white shadow mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
          <div>
            <p className="font-bold text-gray-700 text-xl">{customer?.Name}</p>
            <p className="text-gray-400 rounded-md px-2 py-1 font-medium">
              Name
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-700 text-xl">
              {customer?.Age} Years
            </p>
            <p className="text-gray-400 rounded-md px-2 py-1 font-medium">
              Age
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-700 text-xl">
              {customer?.CreditScore}
            </p>
            <p className="text-gray-400 rounded-md px-2 py-1 font-medium">
              Credit Score
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="w-48 h-48 bg-blue-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-blue-500 text-3xl">
            {customer?.LoanID}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            className="text-white py-2 px-4 text-sm uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            onClick={onPredictDefaulter}
          >
            Predict Whether Defaulter using ML
          </button>
          {defaulterLoading && (
            <img
              src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
              width="30px"
            />
          )}
          {defaulterLoading && (
            <p className="text-gray-700 font-bold text-xl">{defaulter}</p>
          )}
        </div>
      </div>

      <div class="mt-12 text-center border-b pb-12 flex flex-col items-center justify-center">
        <button
          //   onClick={downloadPdf}
          className="flex w-56 mb-8 items-center justify-center gap-4 font-bold text-xl rounded bg-green-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-green-500"
        >
          <span>Get Insights using LLM</span>

          {/* {loading && (
                <img
                  src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                  width="30px"
                />
              )} */}
        </button>

        <div className="grid grid-cols-4 gap-8">
          <div>
            <p className="font-bold text-gray-700 text-xl">
              {customer?.LoanAmount}
            </p>
            <p className="text-gray-50 bg-primHover rounded-md px-2 py-1 font-medium">
              Loan Amount
            </p>
          </div>
          <div>
            <p className="font-bold text-gray-700 text-xl">
              {customer?.LoanTerm}
            </p>
            <p className="text-gray-50 bg-primHover rounded-md px-2 py-1 font-medium">
              Loan Term
            </p>
          </div>
          <div>
            <p className="font-bold text-gray-700 text-xl">
              {customer?.InterestRate}
            </p>
            <p className="text-gray-50 bg-primHover rounded-md px-2 py-1 font-medium">
              Interest Rate
            </p>
          </div>
          <div>
            <p className="font-bold text-gray-700 text-xl">
              {customer?.DTIRatio}
            </p>
            <p className="text-gray-50 bg-primHover rounded-md px-2 py-1 font-medium">
              DTI Ratio
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-700 text-xl">
              {customer?.LoanPurpose}
            </p>
            <p className="text-gray-50 bg-primHover rounded-md px-2 py-1 font-medium">
              Loan Purpose
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-700 text-xl">
              {customer?.MonthsEmployed}
            </p>
            <p className="text-gray-50 bg-primHover rounded-md px-2 py-1 font-medium">
              Months Employed
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-700 text-xl">
              {customer?.Education}
            </p>
            <p className="text-gray-50 bg-primHover rounded-md px-2 py-1 font-medium">
              Education
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-700 text-xl">
              {customer?.EmploymentType}
            </p>
            <p className="text-gray-50 bg-primHover rounded-md px-2 py-1 font-medium">
              Employment Type
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-700 text-xl">
              {customer?.MaritalStatus}
            </p>
            <p className="text-gray-50 bg-primHover rounded-md px-2 py-1 font-medium">
              Marital Status
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-700 text-xl">
              {customer?.HasMortgage}
            </p>
            <p className="text-gray-50 bg-primHover rounded-md px-2 py-1 font-medium">
              Has Mortgage
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-700 text-xl">
              {customer?.HasDependents}
            </p>
            <p className="text-gray-50 bg-primHover rounded-md px-2 py-1 font-medium">
              Has Dependents
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-700 text-xl">
              {customer?.HasCoSigner}
            </p>
            <p className="text-gray-50 bg-primHover rounded-md px-2 py-1 font-medium">
              Has CoSigner
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;
