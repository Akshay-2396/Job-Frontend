

import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companyslice";

const Companies = () => {
  const navigate = useNavigate();

  useGetAllCompanies();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          
          {/* Search Input */}
          <div className="w-full sm:w-1/2 md:w-1/3">
            <Input
              className="w-full"
              placeholder="Filter by company name..."
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </div>

          {/* Button */}
          <div className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto px-6"
              onClick={() => navigate("/admin/companies/create")}
            >
              Add Company
            </Button>
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="bg-white rounded-lg shadow-sm p-4 overflow-x-auto">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;