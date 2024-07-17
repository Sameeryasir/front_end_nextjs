"use client";
import React, { useEffect, useState } from "react";
import { fetchService } from "@/app/service/Service";
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
import { CalendarDays, Clock, NotebookPen } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { fetchEmployees } from "@/app/service/employee";
import Employee from "@/app/_components/Employee";

export default function BookingAppointment() {
  const [date, setDate] = useState(new Date());
  const [timeslot, setTimeslot] = useState([]);
  const [service, setService] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [selectedService, setSelectedService] = useState(""); // Change to a single service
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [serviceDropdownVisible, setServiceDropdownVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchService();
        const resp = await fetchEmployees();
        setService(response);
        setEmployee(resp);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData(); // Call fetchData inside useEffect
  }, []);

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timelist = [];

    // Generate timeslots from 10 AM to 6:30 PM
    for (let i = 10; i <= 18; i++) {
      // 18 corresponds to 6 PM in 24-hour format
      if (i <= 12) {
        timelist.push({
          time: i + ":00 AM",
        });
        timelist.push({
          time: i + ":30 AM",
        });
      } else {
        let hour = i - 12;
        timelist.push({
          time: hour + ":00 PM",
        });
        timelist.push({
          time: hour + ":30 PM",
        });
      }
    }

    setTimeslot(timelist);
  };

  const isPastDay = (day) => {
    return day < new Date().setHours(0, 0, 0, 0);
  };

  const handleServiceChange = (serviceId) => {
    setSelectedService(serviceId === selectedService ? "" : serviceId);
  };

  const calculateTotalPrice = () => {
    const selectedServiceData = service.find(
      (s) => s.ServiceId === selectedService
    );
    return selectedServiceData ? selectedServiceData.ServicePrice : 0;
  };

  const handleSubmit = async () => {
    const appointmentData = {
      Date: date.toISOString().split("T")[0],
      selectedTimeSlot,
      ServiceId: selectedService,
      EmployeeId: selectedEmployee,
      CustomerId: 1,
      ShopId: 1,
      Price: calculateTotalPrice(),
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/appointement", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Appointment successfully added:", data);
      setIsDialogOpen(false); // Close the dialog after successful submission
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  return (
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
                {/* Calendar */}
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
                {/* Time */}
                <div>
                  <h2 className="flex gap-2 items-center mb-3">
                    <Clock className="text-primary h-5 w-5" />
                    Select Time
                  </h2>
                  <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                    {timeslot?.map((item, index) => (
                      <h2
                        key={index}
                        onClick={() => setSelectedTimeSlot(item.time)}
                        className={`p-2 border cursor-pointer text-center hover:bg-primary hover:text-white rounded-full ${
                          item.time === selectedTimeSlot &&
                          "bg-primary text-white"
                        }`}
                      >
                        {item.time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
              {/* Service and Employee Dropdowns */}
              <div className="flex mt-4 gap-4">
                <div className="flex-1 animate-slide-in relative dropdown-container">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Select Service
                  </label>
                  <div className="relative">
                    <div
                      className="block w-full p-2 border rounded-md cursor-pointer transition duration-300 ease-in-out"
                      onClick={() =>
                        setServiceDropdownVisible(!serviceDropdownVisible)
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">
                          {selectedService
                            ? service.find(
                                (s) => s.ServiceId === selectedService
                              )?.ServiceName
                            : "Select a service"}
                        </span>
                        <svg
                          className={`h-5 w-5 text-gray-400 transform ${
                            serviceDropdownVisible ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {serviceDropdownVisible && (
                      <div className="absolute z-10 bg-white border rounded-md mt-1 w-full max-h-56 overflow-auto shadow-lg">
                        {service.map((services) => (
                          <div
                            key={services.ServiceId}
                            className={`flex items-center p-2 hover:bg-primary hover:text-white cursor-pointer ${
                              selectedService === services.ServiceId &&
                              "bg-primary text-white"
                            }`}
                            onClick={() => handleServiceChange(services.ServiceId)}
                          >
                            <span>
                              {services.ServiceName} - PKR{" "}
                              {services.ServicePrice}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 animate-slide-in">
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
                    {employee.map((employees) => (
                      <option
                        key={employees.EmployeeId}
                        value={employees.EmployeeId} // Use ID instead of Name
                      >
                        {employees.Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Total Price */}
              <div className="mt-4">
                <h2 className="text-lg font-medium">
                  Total Price: PKR {calculateTotalPrice()}
                </h2>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <>
            <Button
              className="text-red-500"
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)} // Close the dialog
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={
                !date ||
                !selectedTimeSlot ||
                !selectedService ||
                !selectedEmployee
              }
            >
              Submit
            </Button>
          </>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
