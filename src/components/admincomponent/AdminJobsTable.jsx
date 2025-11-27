

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { companies } = useSelector((store) => store.company);
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;

        return (
          job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });

    setFilterJobs(filteredJobs || []);
  }, [allAdminJobs, searchJobByText]);

  if (!companies) {
    return <p className="text-center py-4">Loading...</p>;
  }

  return (
    <div className="w-full">
      {/* ✅ Desktop & Tablet Table */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>Your Recently Posted Jobs</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan="4" className="text-center py-6">
                  No Jobs Found
                </TableCell>
              </TableRow>
            ) : (
              filterJobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell>
                    {job?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-right">
                    <ActionMenu job={job} navigate={navigate} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ✅ Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {filterJobs.length === 0 ? (
          <p className="text-center text-gray-600">No Jobs Found</p>
        ) : (
          filterJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow-md p-4 border space-y-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">
                  {job?.title}
                </h3>
                <ActionMenu job={job} navigate={navigate} />
              </div>

              <p className="text-sm text-gray-600">
                <span className="font-semibold">Company:</span>{" "}
                {job?.company?.name}
              </p>

              <p className="text-sm text-gray-600">
                <span className="font-semibold">Posted:</span>{" "}
                {job?.createdAt?.split("T")[0]}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* ✅ Reusable Action Menu */
const ActionMenu = ({ job, navigate }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <MoreHorizontal className="cursor-pointer hover:text-blue-600" />
      </PopoverTrigger>

      <PopoverContent className="w-36">
        <div
          onClick={() => navigate(`/admin/companies/${job._id}`)}
          className="flex items-center gap-2 cursor-pointer mb-2 hover:text-blue-600"
        >
          <Edit2 className="w-4 h-4" />
          <span>Edit</span>
        </div>

        <hr className="my-1" />

        <div
          onClick={() =>
            navigate(`/admin/jobs/${job._id}/applicants`)
          }
          className="flex items-center gap-2 cursor-pointer hover:text-blue-600 mt-2"
        >
          <Eye className="w-4 h-4" />
          <span>Applicants</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AdminJobsTable;