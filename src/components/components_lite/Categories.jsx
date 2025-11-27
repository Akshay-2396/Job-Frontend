
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="px-4 py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
          Categories
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Explore our extensive job market.
        </p>
      </div>

      {/* Carousel */}
      <Carousel className="w-full max-w-6xl mx-auto">
        <CarouselContent className="-ml-2">
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="
                pl-2
                basis-full
                sm:basis-1/2
                md:basis-1/3
                lg:basis-1/4
              "
            >
              <div className="h-full flex justify-center">
                <Button
                  onClick={() => searchjobHandler(category)}
                  className="w-full bg-black text-white py-6 text-sm sm:text-base rounded-xl text-center shadow-md hover:shadow-lg transition-all "
                  variant="outline"
                >
                  {category}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows */}
        <CarouselPrevious className="sm:flex" />
        <CarouselNext className=" sm:flex" />
      </Carousel>
    </div>
  );
};

export default Categories;