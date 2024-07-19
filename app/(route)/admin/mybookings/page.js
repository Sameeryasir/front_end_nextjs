'use client';
import { fetchAppointementbyAdmin } from '@/app/service/appbyUser';
import React, { useEffect, useState } from 'react'
import BookingList from '../../mybooking/_components/BookingList';

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
    <div><BookingList app={app}/> </div>
  )
}
