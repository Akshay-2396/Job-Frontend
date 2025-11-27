import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.jobs?.allJobs || []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
      
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center sm:text-left">
        <span className="text-[#6A38C2]">Latest </span>& <span className="text-[#FA4F09]">Top</span> Job Openings
      </h2>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-8">
        {allJobs.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No Job Available
          </p>
        ) : (
          allJobs.slice(0, 6).map((job) =>
            job?._id ? (
              <JobCards key={job._id} job={job} />
            ) : (
              <span key={Math.random()} className="text-red-500">
                Invalid Job Data
              </span>
            )
          )
        )}
      </div>
    </div>
  );
};

export default LatestJobs;