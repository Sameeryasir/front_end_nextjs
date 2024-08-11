'use client';
import { fetchAppointementbyAdmin } from '@/app/service/appbyUser';
import React, { useEffect, useState } from 'react'
import Appointment from './_component/Appointement';

export default function page() {
    const [app, SetAppointements] = useState([]);
    useEffect(() => {
      SetAppointements([]);
      const fetchdata = async () => {
        try {
          const response = await fetchAppointementbyAdmin();
          SetAppointements(response);
          console.log(response);
        } catch (error) {
          console.error("error fetching data", error);
        }
      };
      fetchdata();
    }, []);
    return (
    <div><Appointment app={app}/> </div>
  )
}
