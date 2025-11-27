


import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllJAdminobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">

          {/* Input */}
          <Input
            className="w-full md:w-96"
            placeholder="Search by Company or Job Title"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Button */}
          <Button
            className="w-full md:w-auto px-6 py-2"
            onClick={() => navigate("/admin/jobs/create")}
          >
            Post New Job
          </Button>
        </div>

        {/* Jobs Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;