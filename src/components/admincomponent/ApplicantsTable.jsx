
import React, { useState, useEffect } from "react";
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
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  // Local copy for UI update
  const [localApplicants, setLocalApplicants] = useState([]);

  // Track which popover is open
  const [openPopover, setOpenPopover] = useState(null);

  useEffect(() => {
    if (applicants?.applications) {
      setLocalApplicants(applicants.applications);
    }
  }, [applicants]);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;

      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status }
      );

      if (res.data.success) {
        // ✅ Update local UI status
        const updated = localApplicants.map((item) =>
          item._id === id ? { ...item, status } : item
        );

        setLocalApplicants(updated);

        toast.success(res.data.message);

        // ✅ Close popover after selection
        setOpenPopover(null);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[850px]">
        <TableCaption className="text-sm">
          A list of your recent applicants
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden md:table-cell">Contact</TableHead>
            <TableHead className="hidden sm:table-cell">Resume</TableHead>
            <TableHead className="hidden lg:table-cell">Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {localApplicants?.length > 0 ? (
            localApplicants.map((item) => (
              <TableRow key={item._id}>
                {/* NAME */}
                <TableCell className="font-medium">
                  {item?.applicant?.fullname}
                </TableCell>

                {/* EMAIL */}
                <TableCell>
                  <span className="break-all text-sm">
                    {item?.applicant?.email}
                  </span>
                </TableCell>

                {/* CONTACT */}
                <TableCell className="hidden md:table-cell">
                  {item?.applicant?.phoneNumber || "N/A"}
                </TableCell>

                {/* RESUME */}
                <TableCell className="hidden sm:table-cell">
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 text-sm underline"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="text-gray-500 text-sm">N/A</span>
                  )}
                </TableCell>

                {/* DATE */}
                <TableCell className="hidden lg:table-cell">
                  {item?.createdAt?.split("T")[0]}
                </TableCell>

                {/* ACTION */}
                <TableCell className="text-right">
                  <Popover
                    open={openPopover === item._id}
                    onOpenChange={(open) =>
                      setOpenPopover(open ? item._id : null)
                    }
                  >
                    <PopoverTrigger className="p-2 hover:bg-gray-100 rounded-md">
                      <MoreHorizontal className="w-5 h-5" />
                    </PopoverTrigger>

                    <PopoverContent className="w-40 p-2">
                      {shortlistingStatus.map((status, index) => (
                        <label
                          key={index}
                          className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-50 rounded px-1"
                        >
                          <input
                            type="radio"
                            name={`status-${item._id}`}
                            value={status}
                            checked={item?.status === status}   // ✅ Show previous status
                            onChange={() =>
                              statusHandler(status, item?._id)
                            }
                            className="w-3 h-3 accent-blue-600 cursor-pointer"
                          />
                          <span className="text-sm">{status}</span>
                        </label>
                      ))}
                    </PopoverContent>
                  </Popover>

                  {/* Show current status under button on mobile */}
                  {item?.status && (
                    <p className="text-xs text-gray-500 mt-1 md:hidden">
                      Status: {item.status}
                    </p>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan="6"
                className="text-center text-gray-500 py-6"
              >
                No applicants found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;