
import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Navbar from "../components_lite/Navbar";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const Description = () => {
  const params = useParams();
  const jobId = params.id;

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        const updateSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id },
          ],
        };

        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          setError("Failed to fetch job");
        }
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-10">Loading job...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-10 text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!singleJob) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-10">No job found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div className="px-4 md:px-6">
        <div className="max-w-7xl mx-auto my-8">

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="font-bold text-lg sm:text-xl md:text-2xl">
                {singleJob?.title}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="ghost" className="text-blue-600 font-semibold">
                  {singleJob?.position} Positions
                </Badge>

                <Badge variant="ghost" className="text-orange-600 font-semibold">
                  {singleJob?.salary} LPA
                </Badge>

                <Badge variant="ghost" className="text-purple-600 font-semibold">
                  {singleJob?.location}
                </Badge>

                <Badge variant="ghost" className="text-black font-semibold">
                  {singleJob?.jobType}
                </Badge>
              </div>
            </div>

            {/* Apply Button */}
            <div className="self-start lg:self-end w-full sm:w-auto">
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`w-full sm:w-auto px-8 py-3 rounded-lg text-sm sm:text-base ${
                  isApplied
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-[#6B3AC2] hover:bg-[#552d9b]"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>
          </div>

          {/* Job Description */}
          <div className="mt-8">
            <h2 className="text-base sm:text-lg font-semibold mb-2 border-b pb-2">
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {singleJob?.description}
            </p>
          </div>

          {/* Details Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
            <Detail label="Role" value={`${singleJob?.position} Positions`} />
            <Detail label="Location" value={singleJob?.location} />
            <Detail label="Salary" value={`${singleJob?.salary} LPA`} />
            <Detail label="Experience" value={`${singleJob?.experienceLevel} Years`} />
            <Detail label="Applicants" value={singleJob?.applications?.length} />
            <Detail label="Job Type" value={singleJob?.jobType} />
            <Detail label="Post Date" value={singleJob?.createdAt.split("T")[0]} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ✅ Reusable Detail Component */
const Detail = ({ label, value }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 border">
      <h3 className="font-semibold text-gray-800 mb-1">{label}</h3>
      <p className="text-gray-600 break-words">{value}</p>
    </div>
  );
};

export default Description;