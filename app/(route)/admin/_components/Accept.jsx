import React from "react";
import { Button } from "@/components/ui/button";
import { updatebyId } from "@/app/service/Update";

export default function Accept({ AppointmentId }) {
  const handleSubmit = async () => {
    window.location.reload();
    try {
      const response = await updatebyId(AppointmentId);

      if (response.success) {
        console.log("Appointment accepted:", response.data);
      } else {
        console.error("Failed to accept the appointment", response.error);
      }
    } catch (error) {
      console.error("Error accepting the appointment", error);
    }
  };

  return (
    <Button
      onClick={handleSubmit}
      className="w-full p-2 px-4 border border-primary bg-white text-primary hover:bg-primary hover:text-white"
    >
      Finish
    </Button>
  );
}
