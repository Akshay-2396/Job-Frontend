

import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );

    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center px-4 py-6">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-3xl bg-white p-4 sm:p-6 lg:p-8 border rounded-xl shadow-md"
        >
          <h1 className="text-xl font-bold mb-6 text-center">
            Post a New Job
          </h1>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                placeholder="Enter job title"
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                placeholder="Enter job description"
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                placeholder="Enter job location"
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                placeholder="Enter salary"
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                placeholder="Number of positions"
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                placeholder="Enter requirements"
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Experience (Years)</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                placeholder="Experience required"
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                placeholder="Full-time, Part-time, etc."
                onChange={changeEventHandler}
                className="mt-1"
              />
            </div>

            {/* Company Select */}
            <div className="sm:col-span-2">
              <Label>Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-red-600 text-sm mt-2">
                  No companies available.
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            {loading ? (
              <Button className="w-full flex items-center justify-center gap-2" disabled>
                <Loader2 className="h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full text-white bg-black hover:bg-blue-600"
              >
                Post Job
              </Button>
            )}
          </div>

          {/* No Company Warning */}
          {companies.length === 0 && (
            <p className="text-sm font-semibold mt-4 text-center text-red-600">
              Please register a company to post jobs
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;