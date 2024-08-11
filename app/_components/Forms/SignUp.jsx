"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const schema = z.object({
  FullName:z.string()
  .min(3, " Name must be at least 3 characters long")
  .max(50, "Name must be at most 50 characters long")
  .nonempty("Name is required")
  .regex(/^[a-zA-Z\s]+$/, "Name can only contain alphabetic characters and spaces"),
  Email: z.string().email(),
  Password: z.string().min(6).max(15),
  UserType: z.string().min(3),
});

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Signup successful:", responseData);
      
      router.push('/logIn/')
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className="max-w-md mx-auto p-6 bg-white shadow-2xl rounded-lg space-y-4 mt-10"
  >
    <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
    <div className="flex flex-col">
      <label className="mb-1 text-md text-gray-700 font-semibold"> Name:</label>
      <input
        {...register("FullName")}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
      />
      {errors.FullName && (
        <p className="text-red-500 text-sm mt-1">{errors.FullName.message}</p>
      )}
    </div>
    <div className="flex flex-col">
      <label className="mb-1 text-md text-gray-700 font-semibold">Email:</label>
      <input
        {...register("Email")}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
      />
      {errors.Email && (
        <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
      )}
    </div>
    <div className="flex flex-col">
      <label className="mb-1 text-md text-gray-700 font-semibold">Password:</label>
      <input
        type="password"
        {...register("Password")}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
      />
      {errors.Password && (
        <p className="text-red-500 text-sm mt-1">{errors.Password.message}</p>
      )}
    </div>
    <div className="flex flex-col">
      <label className="mb-1 text-md text-gray-700 font-semibold">User Type:</label>
      <select
        {...register("UserType")}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
        defaultValue=""
      >
        <option value="Employee">Employee</option>
        <option value="User">User</option>
        <option value="ServiceProvider">ServiceProvider</option>
      </select>
      {errors.UserType && (
        <p className="text-red-500 text-sm mt-1">{errors.UserType.message}</p>
      )}
    </div>
    <button
      className="px-4 py-2 border border-primary bg-white text-primary w-full text-center text-sm cursor-pointer hover:bg-primary hover:text-white font-bold rounded-lg transition duration-300"
      type="submit"
    >
      Sign Up
    </button>
  </form>
  
  );
};

export default SignupForm;
