"use client";
import React, { useState, useEffect, useContext } from 'react';
import { fetchshopsByUserId } from '@/app/service/getshopsbyUser';
import Shops from '../_components/Shops';
import { useRouter } from 'next/navigation';
import { AuthenticationContext } from '@/app/context/authentication';
export default function Page() {
  const [shops, setShops] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Constant limit
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router =useRouter();
  const { isValid, setIsValid } = useContext(AuthenticationContext);

  useEffect(() => {
    if (!isValid) {
      router.push("/logIn");
      return;
    }
  const fetchData = async (currentPage) => {
    setIsLoading(true);
      setError(null);
    try {
     
      const token = localStorage.getItem("token");
      if (!token) {
        setIsValid(false);
        router.push("/logIn");
        return;
      }
      const response = await fetchshopsByUserId(currentPage, limit);
      const fetchedShops = response?.data || [];
      
      if (fetchedShops.length === 0 && currentPage > 1) {
        setPage(currentPage - 1); 
        return;
      }

      setShops(fetchedShops);
      setTotalPages(Math.ceil(response.total / limit)); 
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

    fetchData(page);
  }, [isValid,page,router,setIsValid,limit]);
  
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsValid(true);
      } else {
        setIsValid(false);
        router.push("/logIn");
      }
    };

    checkAuthStatus();
  }, [setIsValid, router]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };
  if(!isValid){
    return null;
  }

  return (
    <div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <Shops shops={shops} isValid={isValid}/>
      )}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 rounded-l ${
            page <= 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white"
          }`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-white border-t border-b border-gray-300 text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 rounded-r ${
            page >= totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white"
          }`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
