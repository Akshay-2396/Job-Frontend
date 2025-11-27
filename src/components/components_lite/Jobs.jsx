import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }

    const query = searchedQuery.toLowerCase();

    const filtered = allJobs.filter((job) =>
      job.title?.toLowerCase().includes(query) ||
      job.description?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query) ||
      job.experience?.toLowerCase().includes(query) ||
      job.salary?.toLowerCase().includes(query)
    );

    setFilterJobs(filtered);
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 mt-6">
        {/* Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Filter Section */}
          <div className="w-full lg:w-1/4 order-2 lg:order-1">
            <FilterCard />
          </div>

          {/* Job Cards Section */}
          <div className="w-full lg:w-3/4 order-1 lg:order-2">
            {filterJobs.length <= 0 ? (
              <div className="text-center mt-10 text-gray-500 text-lg">
                Job not found
              </div>
            ) : (
              <div className="h-auto lg:h-[80vh] overflow-y-auto pb-6 pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filterJobs.map((job, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      key={job._id}
                    >
                      <Job1 job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs;