// src/components/ShowCustomers.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowCustomers = () => {
  // State to store the list of customers
  const [customers, setCustomers] = useState([]);

  // Function to fetch customers data from the API
  const fetchCustomers = () => {
    axios
      .get(process.env.REACT_APP_BACKEND + "top_ten_new_loans/")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
        // Handle error as needed
      });
  };

  // Fetch customers data on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="mx-auto rounded-md p-6 bg-white shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Customer List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((customer) => (
          <div
            key={customer.LoanID}
            className="border border-gray-300 p-4 rounded-md"
          >
            <p className="text-lg font-semibold mb-2 ">{customer.Name}</p>
            <p>
              <span className="font-bold text-blue-700">LoanID:</span>{" "}
              {customer.LoanID}
            </p>
            <p>
              <span className="font-bold text-blue-700">LoanAmount:</span>{" "}
              {customer.LoanAmount}
            </p>
            <p>
              <span className="font-bold text-blue-700 mb-4">LoanPurpose:</span>{" "}
              {customer.LoanPurpose}
            </p>
            <div className="mt-6 w-full">
              <Link
                className="bg-primHover rounded-md px-4 py-3 font-bold text-lg hover:bg-accent"
                to={`/Customer/Show/` + customer.LoanID}
              >
                View Customer
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowCustomers;
