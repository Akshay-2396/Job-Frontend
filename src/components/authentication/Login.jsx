
import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`https://job-backend-7iww.onrender.com/api/user/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Center Container */}
      <div className="flex flex-1 justify-center items-center px-4 py-6">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-sm sm:max-w-md bg-white border border-gray-300 rounded-xl shadow-md p-5 sm:p-6"
        >
          <h1 className="font-bold text-xl md:text-2xl mb-6 text-center text-blue-600">
            Login
          </h1>

          {/* Email */}
          <div className="mb-4">
            <Label className="text-sm">Email</Label>
            <Input
              type="email"
              placeholder="johndoe@gmail.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="mt-1"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label className="text-sm">Password</Label>
            <Input
              type="password"
              placeholder="******"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="mt-1"
            />
          </div>

          {/* Role */}
          <div className="mb-5">
            <Label className="text-sm">Select Role</Label>

            <div className="flex gap-6 mt-2">
              {/* Student */}
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="h-3 w-3 cursor-pointer"
                />
                Student
              </label>

              {/* Recruiter */}
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="h-3 w-3 cursor-pointer"
                />
                Recruiter
              </label>
            </div>
          </div>

          {/* Login Button */}
          {loading ? (
            <div className="flex justify-center my-4">
              <div className="h-6 w-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 mb-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm md:text-base"
            >
              Login
            </button>
          )}

          {/* Register Section */}
          <div className="text-center">
            <p className="text-gray-700 text-sm mb-3">
              Don’t have an account?
            </p>
            <Link to="/register">
              <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all text-sm md:text-base">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;