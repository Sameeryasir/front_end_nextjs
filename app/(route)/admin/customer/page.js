"use client";
import React from 'react'
import CustomerList from '../_components/Customer'
import { useState,useEffect } from 'react';
import { fetchAppointementbyAdmin } from '@/app/service/appbyUser';

export default function page() {
  const [app, SetAppointements] = useState([]);
  useEffect(() => {
    SetAppointements([]);
    const fetchdata = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetchAppointementbyAdmin();
        SetAppointements(response);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    fetchdata();
  }, []);
  return (
    <div><CustomerList  app={app}/></div>
  )
}
