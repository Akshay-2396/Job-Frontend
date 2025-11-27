import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col gap-6 my-8 sm:my-12 md:my-16">

          {/* Badge */}
          <span className="px-4 py-2 mx-auto flex items-center gap-2 rounded-full bg-gray-200 text-sm sm:text-base text-red-600 font-medium">
            <PiBuildingOfficeBold className="text-[#614232] text-lg" />
            No.1 Job Hunt Website
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Search    <span className="text-[#FA4F09]">Apply</span> & <br />
            Get Your <span className="text-[#6A38C2]">Dream Job</span>
          </h2>

          {/* Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start your hunt for the best, life-changing career opportunities
            from here in your selected areas conveniently and get hired quickly.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-[80%] md:w-[60%] lg:w-[50%] mx-auto shadow-lg border border-gray-300 px-3 py-2 rounded-full gap-3">
            
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find Your Dream Job"
              className="outline-none border-none w-full bg-transparent text-sm sm:text-base px-2"
            />

            <Button 
              onClick={searchjobHandler}
              className="rounded-full w-full sm:w-auto px-6"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Header;