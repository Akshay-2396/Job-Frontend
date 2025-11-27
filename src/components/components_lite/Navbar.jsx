
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Menu, X, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/logout`,
        {},
        { withCredentials: true }
      );

      if (res?.data?.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error logging out. Try again.");
    }
  };

  const commonLinks = (
    <>
      {user && user.role === "Recruiter" ? (
        <>
          <Link to="/admin/companies" className="hover:text-[#FA4F09]">
            Companies
          </Link>
          <Link to="/admin/jobs" className="hover:text-[#FA4F09]">
            Jobs
          </Link>
        </>
      ) : (
        <>
          <Link to="/Home" className="hover:text-[#FA4F09]">
            Home
          </Link>
          <Link to="/Browse" className="hover:text-[#FA4F09]">
            Browse
          </Link>
          <Link to="/Jobs" className="hover:text-[#FA4F09]">
            Jobs
          </Link>
        </>
      )}
    </>
  );

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto h-16">

        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold">
          <span className="text-[#6B3AC2]">Job</span>{" "}
          <span className="text-[#FA4F09]">Portal</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          <div className="flex gap-6 font-medium">
            {commonLinks}
          </div>

          {!user ? (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-red-600 hover:bg-red-700">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user?.fullname}</h3>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-gray-700">

                  {user.role === "Student" && (
                    <Link
                      to="/Profile"
                      className="flex items-center gap-2 hover:text-purple-600"
                    >
                      <User2 size={18} /> Profile
                    </Link>
                  )}

                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 flex flex-col gap-4">

          <div className="flex flex-col gap-3 font-medium">
            {commonLinks}
          </div>

          {!user ? (
            <div className="flex flex-col gap-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-red-600 hover:bg-red-700 w-full">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 border-t pt-3">

              {user.role === "Student" && (
                <Link
                  to="/Profile"
                  className="flex items-center gap-2"
                >
                  <User2 size={18} /> Profile
                </Link>
              )}

              <button
                onClick={logoutHandler}
                className="flex items-center gap-2 text-red-600"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;