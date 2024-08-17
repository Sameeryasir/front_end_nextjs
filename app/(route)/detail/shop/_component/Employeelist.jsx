import Image from "next/image";
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function EmployeeList({ shop }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (!shop) {
    console.error("Shop data is not available");
    return null;
  }

  if (!shop.employees || shop.employees.length === 0) {
    console.error("No employees found in the shop data");
    return null;
  }

  const employeesToShow = shop.employees.slice(currentIndex, currentIndex + 1);

  const prevSlide = () => {
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? shop.employees.length - 1 : prevIndex - 1
      );
    }, 300); // Delay of 300ms before the transition
  };

  const nextSlide = () => {
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === shop.employees.length - 1 ? 0 : prevIndex + 1
      );
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-gray-900 text-center">
        <span className="text-primary">{shop?.Name} </span>Employees
      </h2>
      <div className="relative flex items-center justify-center w-full max-w-full lg:max-w-2xl mx-auto">
        <button
          className="absolute left-0 transform -translate-x-6 sm:-translate-x-10 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          onClick={prevSlide}
        >
          <ArrowLeft className="h-10 w-10 sm:h-12 sm:w-12" />
        </button>
        <div className="flex flex-col items-center text-center px-4 sm:px-6">
          {employeesToShow.map((employee) => (
            <div
              key={employee.id}
              className="flex flex-col items-center justify-center text-center space-y-4"
              style={{ minHeight: "300px" }} // Setting a minimum height to keep consistency
            >
              <p
                className="text-base sm:text-lg italic text-gray-600 max-w-xs sm:max-w-lg overflow-hidden"
                style={{ minHeight: "72px", maxHeight: "72px" }} // Fixed height for the description
              >
                {employee.Description}
              </p>
              {employee.publicURL && (
                <Image
                  className="w-24 h-24 rounded-full object-cover"
                  src={employee.publicURL}
                  alt={employee.publicURL}
                  width={96}
                  height={96}
                />
              )}
              <div className="mt-4">
                <p className="font-semibold text-lg text-gray-900">
                  {employee.Name}
                </p>
                <p className="text-gray-500">{employee.Position}</p>
              </div>
              <div className="mt-2 flex justify-center space-x-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>
                      {i < employee.rating ? (
                        <FaStar className="text-yellow-500" />
                      ) : (
                        <FaRegStar className="text-gray-300" />
                      )}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 transform translate-x-6 sm:translate-x-10 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          onClick={nextSlide}
        >
          <ArrowRight className="h-10 w-10 sm:h-12 sm:w-12" />
        </button>
      </div>
      <div className="flex mt-6 space-x-2">
        {shop.employees.map((_, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
              currentIndex === index ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
