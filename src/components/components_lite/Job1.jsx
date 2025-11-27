import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Bookmark } from "lucide-react";

const Job1 = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl shadow-lg bg-white border border-gray-100 flex flex-col justify-between h-full">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button 
          variant="outline" 
          className="rounded-full h-9 w-9" 
          size="icon"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      {/* Company Section */}
      <div className="flex items-center gap-3 my-4">
        <div className="flex-shrink-0">
          <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </div>
        <div>
          <h1 className="font-semibold text-base sm:text-lg">
            {job?.company?.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Info */}
      <div>
        <h1 className="font-bold text-base sm:text-lg mb-1">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold text-xs sm:text-sm" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-semibold text-xs sm:text-sm" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold text-xs sm:text-sm" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white w-full sm:w-auto hover:bg-[#5c0894]">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job1;









