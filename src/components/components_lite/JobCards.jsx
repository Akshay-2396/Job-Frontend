import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="w-full p-4 sm:p-5 lg:p-6 rounded-xl shadow-lg bg-white border border-gray-200 cursor-pointer 
                 hover:shadow-2xl hover:shadow-blue-200 hover:scale-[1.01] transition-all duration-200"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-base sm:text-lg font-semibold text-gray-800">
          {job.name}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          {job.location || "India"}
        </p>
      </div>

      {/* Job Details */}
      <div className="mt-3 space-y-1">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {job.title}
        </h2>

        <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
          {job.description}
        </p>
      </div>

      {/* Badges Section */}
      <div className="flex flex-wrap gap-2 items-center mt-4">
        <Badge className="text-blue-600 font-semibold text-xs sm:text-sm px-2 py-1" variant="ghost">
          {job.position} Positions
        </Badge>

        <Badge className="text-[#FA4F09] font-semibold text-xs sm:text-sm px-2 py-1" variant="ghost">
          {job.salary} LPA
        </Badge>

        <Badge className="text-[#6B3AC2] font-semibold text-xs sm:text-sm px-2 py-1" variant="ghost">
          {job.location}
        </Badge>

        <Badge className="text-black font-semibold text-xs sm:text-sm px-2 py-1" variant="ghost">
          {job.jobType}
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;