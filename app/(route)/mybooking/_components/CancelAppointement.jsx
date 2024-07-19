import React, { useState,useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeleteAppointementsById } from "@/app/service/deleteAppointements";
import BookingList from "./BookingList";
export default function CancelAppointment({ AppointmentId }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [app, SetAppointements] = useState([]);
  useEffect(() => {
    SetAppointements([]);
    const fetchdata = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetchAppointementsByUserId();
        SetAppointements(response);
      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    fetchdata();
  }, []);
  
  const handleSubmit = async () => {
    try {
      const { success, data, error } = await DeleteAppointementsById(AppointmentId);

      if (success) {
        setIsDeleted(true);
      } else {
        console.error("Failed to delete the appointment", error);
      }
    } catch (error) {
      console.error("Error deleting the appointment", error);
    }
  };

  return (
    <div>
      {isDeleted ? (
        <BookingList app={app}/>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="mt-2 text-red-500 border border-red-500 rounded-md px-4 py-1 hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out">
              Cancel Appointment
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                appointment and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
