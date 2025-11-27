import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import { Loader2, X } from "lucide-react";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(",") || "",
    file: null,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-[95%] max-w-md sm:max-w-lg rounded-xl px-4 sm:px-6"
        onInteractOutside={() => setOpen(false)}
      >
        {/* Header */}
        <DialogHeader className="relative">
          <DialogTitle className="text-center text-lg sm:text-xl font-bold">
            Edit Profile
          </DialogTitle>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-2 top-2 text-gray-600 hover:text-black"
          >
       
          </button>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {/* Fields */}
          <div className="space-y-4 py-4">

            <FormField
              label="Full Name"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              value={input.email}
              onChange={changeEventHandler}
            />

            <FormField
              label="Phone"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            />

            <FormField
              label="Bio"
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
            />

            <FormField
              label="Skills"
              name="skills"
              value={input.skills}
              onChange={changeEventHandler}
              placeholder="HTML, CSS, JS"
            />

            {/* Resume */}
            <div className="flex flex-col gap-1">
              <Label>Resume</Label>
              <input
                type="file"
                name="file"
                accept=".pdf"
                onChange={fileChangeHandler}
                className="border rounded-md p-2 text-sm"
              />
            </div>
          </div>

          {/* Footer Button */}
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-2" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </Button>
            ) : (
              <Button type="submit" className="w-full my-2">
                Save Changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

/* ✅ Reusable Input Component */
const FormField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name}>{label}</Label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B3AC2]"
      />
    </div>
  );
};

export default EditProfileModal;