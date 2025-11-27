
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, error } = useGetAllJobs();
  const jobs = useSelector((state) => state.jobs.allJobs);

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 sm:px-6 md:px-12">
        <Header />
        <Categories />

        {loading && (
          <p className="text-center text-lg font-medium mt-6">
            Loading jobs...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 mt-6">
            Error: {error}
          </p>
        )}

        {!loading && !error && (
          <LatestJobs jobs={jobs} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;