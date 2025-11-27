

import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    pancard: "",
    adharcard: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("pancard", input.pancard);
    formData.append("adharcard", input.adharcard);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-8">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-lg border border-gray-300 rounded-xl p-5 bg-white shadow-md"
        >
          <h1 className="font-bold text-xl md:text-2xl mb-6 text-center text-blue-600">
            Register
          </h1>

          {/* Full Name */}
          <div className="mb-3">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="johndoe@gmail.com"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="******"
            />
          </div>

          {/* PAN */}
          <div className="mb-3">
            <Label>PAN Card Number</Label>
            <Input
              type="text"
              name="pancard"
              value={input.pancard}
              onChange={changeEventHandler}
              placeholder="ABCDE1234F"
            />
          </div>

          {/* Aadhar */}
          <div className="mb-3">
            <Label>Aadhar Card Number</Label>
            <Input
              type="text"
              name="adharcard"
              value={input.adharcard}
              onChange={changeEventHandler}
              placeholder="123456789012"
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="+91XXXXXXXXXX"
            />
          </div>

          {/* ✅ FIXED Role Radio Buttons */}
          <div className="mb-4">
            <Label className="mb-2 block">Role</Label>

            <div className="flex flex-col sm:flex-row gap-4">

              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="h-4 w-4 accent-blue-600 cursor-pointer"
                />
                <span>Student</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="h-4 w-4 accent-blue-600 cursor-pointer"
                />
                <span>Recruiter</span>
              </label>

            </div>
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <Label>Profile Photo</Label>
            <Input type="file" accept="image/*" onChange={ChangeFilehandler} />
          </div>

          {/* Button */}
          {loading ? (
            <div className="flex justify-center my-4">
              <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm md:text-base"
            >
              Register
            </button>
          )}

          <p className="text-gray-600 text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;