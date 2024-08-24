"use client";
import React, { useEffect, useState } from "react";
import { fetchService } from "@/app/service/Service";
import { loadStripe } from "@stripe/stripe-js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Clock,
  NotebookPen,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { fetchEmployees } from "@/app/service/employee";

const stripePromise = loadStripe(
  "sk_test_51PnDpkAZuR0axWHNPIactCBf2naBPaAmZ63pYSrfsizEYzeVpkBhyq7Ov6hF8KYsFNp1VupaPJyBWbAx3Oo3r4QV00iui3ZfUv"
);

export default function BookingAppointment({ shop }) {
  const [date, setDate] = useState(new Date());
  const [timeslot, setTimeslot] = useState([]);
  const [service, setService] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchService();
        setService(response);
        const empResponse = await fetchEmployees();
        setEmployee(empResponse);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    getTime();
  }, [date]);

  const getTime = () => {
    const timelist = [];
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    const selectedDate = new Date(date);
    const selectedDateHours = selectedDate.getHours();
    const selectedDateMinutes = selectedDate.getMinutes();

    const formatTime = (hour, minute) => {
      const period = hour < 12 ? "AM" : "PM";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${formattedHour}:${minute < 10 ? "0" : ""}${minute} ${period}`;
    };

    const isTimeInPast = (hour, minute) => {
      if (selectedDate.toDateString() === now.toDateString()) {
        if (
          hour < currentHours ||
          (hour === currentHours && minute <= currentMinutes)
        ) {
          return true;
        }
      }
      return false;
    };

    for (let i = 10; i <= 22; i++) {
      if (i === 12) {
        timelist.push({ time: formatTime(12, 0), isPast: isTimeInPast(12, 0) });
        timelist.push({
          time: formatTime(12, 30),
          isPast: isTimeInPast(12, 30),
        });
      } else if (i < 12) {
        timelist.push({ time: formatTime(i, 0), isPast: isTimeInPast(i, 0) });
        timelist.push({ time: formatTime(i, 30), isPast: isTimeInPast(i, 30) });
      } else {
        const hour = i - 12;
        timelist.push({ time: formatTime(i, 0), isPast: isTimeInPast(i, 0) });
        timelist.push({ time: formatTime(i, 30), isPast: isTimeInPast(i, 30) });
      }
    }

    setTimeslot(timelist);
  };

  useEffect(() => {
    // When the dialog is opened, set the date to the current date
    if (isDialogOpen) {
      setDate(new Date());
    }
  }, [isDialogOpen]);

  const isPastDay = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentTime = today.getTime();
    const selectedTime = day.getTime();
    const openingMinutes = 10 * 60; // 10:00 AM in minutes

    if (selectedTime < currentTime) {
      return true;
    }

    if (
      selectedTime === currentTime &&
      today.getHours() * 60 + today.getMinutes() >= openingMinutes
    ) {
      return true;
    }

    return false;
  };

  const handleServiceChange = (serviceId) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.includes(serviceId)
        ? prevSelectedServices.filter((id) => id !== serviceId)
        : [...prevSelectedServices, serviceId]
    );
  };

  const calculateTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const selectedServiceData = service.find(
        (s) => s.ServiceId === serviceId
      );
      return (
        total + (selectedServiceData ? selectedServiceData.ServicePrice : 0)
      );
    }, 0);
  };

 

    const handleSubmit = async () => {
      let sound = new Audio("/sounds/answer-tone.wav");
      let sound2 = new Audio("/sounds/error.mp3");
    
      // Normalize the date to avoid timezone issues
      const normalizedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      
      const appointmentData = {
        date: normalizedDate.toISOString().split("T")[0], // Use normalized date
        Time: selectedTimeSlot,
        EmployeeId: selectedEmployee,
        ShopId: shop?.ShopId,
        ServicesId: selectedServices,
        Price: calculateTotalPrice(),
      };
    
      const token = localStorage.getItem("token");
    
      console.log("Submitting appointment data:", appointmentData);
    
      try {
        const response = await fetch("http://localhost:3000/appointement", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(appointmentData),
        });
    
        if (!response.ok) {
          sound2.play();
          if (response.status === 400) {
            setIsDialogOpen(false);
            setIsErrorDialogOpen(true);
          } else {
            throw new Error("Network response was not ok");
          }
        } else {
          sound.play();
          const data = await response.json();
          console.log("Appointment successfully added:", data);
          setErrorMessage("");
          setIsDialogOpen(false);
          setIsConfirmationDialogOpen(true);
        }
      } catch (error) {
        console.error("Error adding appointment:", error);
        if (!errorMessage) {
          setErrorMessage("An error occurred while booking the appointment.");
          setIsDialogOpen(false);
          setIsErrorDialogOpen(true);
        }
      }
    };
    

  return (
    <div>
      {errorMessage && (
        <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <Button className="flex gap-2 w-full">
            <NotebookPen />
            Book Appointment
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3 items-baseline">
                    <h2 className="flex gap-2 items-center">
                      <CalendarDays className="text-primary h-5 w-5" />
                      Select Date
                    </h2>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={isPastDay}
                      className="rounded-md border"
                    />
                  </div>
                  <div>
                    <h2 className="flex gap-2 items-center mb-3">
                      <Clock className="text-primary h-5 w-5" />
                      Select Time
                    </h2>
                    <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                      {timeslot?.map((item, index) => (
                        <h2
                          key={index}
                          onClick={() =>
                            !item.isPast && setSelectedTimeSlot(item.time)
                          }
                          className={`p-2 border cursor-pointer text-center rounded-full ${
                            item.isPast
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : item.time === selectedTimeSlot
                              ? "bg-primary text-white"
                              : "hover:bg-primary hover:text-white"
                          }`}
                        >
                          {item.time}
                        </h2>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex mt-4 gap-4">
                  <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Select Services
                    </label>
                    <fieldset className="space-y-2 h-30 overflow-y-auto p-2 border rounded " >
                      {shop?.services?.map((services) => (
                        <label
                          key={services.ServiceId}
                          className="flex items-start gap-4 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            checked={selectedServices.includes(
                              services.ServiceId
                            )}
                            onChange={() =>
                              handleServiceChange(services.ServiceId)
                            }
                          />
                          <div>
                            <strong className="font-medium text-gray-900">
                              {services.ServiceName} - PKR{" "}
                              {services.ServicePrice}
                            </strong>
                          </div>
                        </label>
                      ))}
                    </fieldset>
                  </div>

                  <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Select Employee
                    </label>
                    <select
                      value={selectedEmployee}
                      onChange={(e) => setSelectedEmployee(e.target.value)}
                      className="block w-full p-2 border rounded-md"
                      size="5"
                    >
                      <option value="" disabled>
                        Select an employee
                      </option>
                      {shop?.employees?.map((employee) => {
                        if (!employee.isPresent) return null;
                        return (
                          <option
                            key={employee.EmployeeId}
                            value={employee.EmployeeId}
                          >
                            {employee.Name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-medium">
                    Total Price: PKR {calculateTotalPrice()}
                  </h2>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button
              className="text-red-500"
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={
                !date ||
                !selectedTimeSlot ||
                selectedServices.length === 0 ||
                !selectedEmployee
              }
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Confirmed</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col items-center gap-4">
                <CheckCircle className="text-green-500 h-12 w-12" />
                <p>Your appointment has been successfully booked!</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              onClick={() => setIsConfirmationDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Error</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col items-center gap-4">
                <AlertCircle className="text-red-500 h-12 w-12" />
                <p>Appointment is already booked for the given time</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button type="button" onClick={() => setIsErrorDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
