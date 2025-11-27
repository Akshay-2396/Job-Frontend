
import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import Navbar from "../components_lite/Navbar";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-800">
            Applicants ({applicants?.applications?.length || 0})
          </h1>

          <p className="text-sm text-gray-600">
            Job ID: <span className="font-semibold">{id}</span>
          </p>
        </div>

        {/* Table Section */}
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;