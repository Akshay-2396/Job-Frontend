import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Kolhapur",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "Frontend",
      "Backend",
      "Mobile",
      "Desktop",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4 sm:p-6 sticky top-20 max-h-[85vh] overflow-y-auto">
      <h1 className="font-bold text-xl text-center sm:text-left mb-4">
        Filter Jobs
      </h1>

      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        <div className="space-y-6">
          {filterData.map((data, index) => (
            <div key={index}>
              <h2 className="font-semibold text-md text-[#6A38C2] mb-3">
                {data.filterType}
              </h2>

              {/* Grid Layout */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {data.array.map((item, indx) => {
                  const itemId = `Id${index}-${indx}`;

                  return (
                    <label
                      key={itemId}
                      htmlFor={itemId}
                      className="flex items-center gap-1 border px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      {/* ✅ Small Radio Button */}
                      <RadioGroupItem
                        value={item}
                        id={itemId}
                        className="h-3 w-3 rounded-full border-gray-400"
                      />
                      <span className="text-xs">{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default Filter;