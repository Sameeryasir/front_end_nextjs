import Image from 'next/image';
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FaStar, FaRegStar } from 'react-icons/fa';

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
    <div className="flex flex-col items-center justify-center py-16 bg-white">
      <h2 className="text-4xl font-semibold mb-8 text-gray-900">
        <span className='text-primary'>{shop?.Name} </span>Employees
      </h2>
      <div className="relative flex items-center justify-center max-w-2xl mx-auto">
        <button
          className="absolute left-0 transform -translate-x-10 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          onClick={prevSlide}
        >
          <ArrowLeft className="h-12 w-12" />
        </button>
        <div className="flex flex-col items-center text-center px-6">
          {employeesToShow.map((employee) => (
            <div
              key={employee.id}
              className="flex flex-col items-center justify-center text-center"
            >
              <p className="text-lg italic text-gray-600 mb-6 max-w-lg">
                {employee.Description}
              </p>
              {employee.publicURL && (
                <Image
                  className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover"
                  src={employee.publicURL}
                  alt={employee.publicURL}
                  width={96}
                  height={96}
                />
              )}
              <div className="mt-4">
                <p className="font-semibold text-lg text-gray-900">{employee.Name}</p>
                <p className="text-gray-500">{employee.Position}</p>
              </div>
              <div className="mt-2 flex justify-center space-x-1">
                {Array(5).fill(0).map((_, i) => (
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
          className="absolute right-0 transform translate-x-10 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          onClick={nextSlide}
        >
          <ArrowRight className="h-12 w-12" />
        </button>
      </div>
      <div className="flex mt-6 space-x-2">
        {shop.employees.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
