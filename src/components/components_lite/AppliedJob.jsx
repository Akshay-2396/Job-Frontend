import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const getStatusColor = (status) => {
    if (status === "rejected") return "bg-red-500";
    if (status === "accepted") return "bg-green-600";
    return "bg-gray-500";
  };

  return (
    <div className="w-full px-2 sm:px-6 py-4">

      {/* No Jobs */}
      {allAppliedJobs.length <= 0 && (
        <div className="text-center text-gray-600 mt-6">
          You have not applied for any job yet.
        </div>
      )}

      {/* Desktop Table */}
      {allAppliedJobs.length > 0 && (
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableCaption>Recent Applied Jobs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob._id}>
                  <TableCell>
                    {appliedJob?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell className="font-medium">
                    {appliedJob?.job?.title}
                  </TableCell>
                  <TableCell>
                    {appliedJob?.job?.company?.name}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className={`${getStatusColor(appliedJob?.status)}`}>
                      {appliedJob?.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Mobile View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {allAppliedJobs.map((appliedJob) => (
          <div
            key={appliedJob._id}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">
                {appliedJob?.job?.title}
              </h3>
              <Badge className={`${getStatusColor(appliedJob?.status)}`}>
                {appliedJob?.status}
              </Badge>
            </div>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Company: </span>
              {appliedJob?.job?.company?.name}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Date: </span>
              {appliedJob?.createdAt?.split("T")[0]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJob;