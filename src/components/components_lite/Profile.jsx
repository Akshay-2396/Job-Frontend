
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border rounded-2xl my-5 p-4 sm:p-6 md:p-8 shadow">

        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-6">

          {/* Left: Profile Info */}
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Avatar className="cursor-pointer h-20 w-20 sm:h-24 sm:w-24">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="profile photo"
              />
            </Avatar>

            <div className="text-center sm:text-left">
              <h1 className="font-medium text-lg sm:text-xl text-[#FA4F09]">
                {user?.fullname}
              </h1>
              <p className="text-[#6B3AC2] text-sm sm:text-base ">
                {user?.profile?.bio || "No bio added"}
              </p>
            </div>
          </div>

          {/* Right: Edit Button */}
          <div className="flex justify-center sm:justify-end">
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="w-fit"
            >
              <Pen className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="my-6 space-y-3 text-sm sm:text-base">
          <div className="flex items-center gap-3 break-all">
            <Mail className="w-5 h-5 text-gray-600" />
            <a
              href={`mailto:${user?.email}`}
              className="text-blue-600 hover:underline"
            >
              {user?.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Contact className="w-5 h-5 text-gray-600" />
            <a
              href={`tel:${user?.phoneNumber}`}
              className="text-blue-600 hover:underline"
            >
              {user?.phoneNumber || "Not Provided"}
            </a>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6">
          <h1 className="font-semibold text-base sm:text-lg mb-2">
            Skills
          </h1>
          <div className="flex gap-2 flex-wrap">
            {user?.profile?.skills?.length ? (
              user.profile.skills.map((skill, index) => (
                <Badge key={index} className="text-sm">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="my-6">
          <h1 className="font-semibold text-base sm:text-lg mb-2">
            Resume
          </h1>
          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              download={user.profile.resumeOriginalName}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all text-sm sm:text-base"
            >
              {user.profile.resumeOriginalname}
            </a>
          ) : (
            <span className="text-gray-500 text-sm sm:text-base">
              No Resume Found
            </span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-6">
        <h1 className="text-lg sm:text-xl my-5 font-bold text-center sm:text-left">
          Applied Jobs
        </h1>
        <AppliedJob />
      </div>

      {/* Edit Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;