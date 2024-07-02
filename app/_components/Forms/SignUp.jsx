"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const schema = z.object({
  FullName: z.string().min(3).max(50).nonempty(),
  Email: z.string().email(),
  Password: z.string().min(6),
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
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto p-4 bg-white shadow-md rounded-md pt-5"
    >
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700">Full Name:</label>
        <input
          {...register("FullName")}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.FullName && (
          <p className="text-red-500 text-sm mt-1">{errors.FullName.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700">Email:</label>
        <input
          {...register("Email")}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.Email && (
          <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700">Password:</label>
        <input
          type="password"
          {...register("Password")}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.Password && (
          <p className="text-red-500 text-sm mt-1">{errors.Password.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700">User Type:</label>
        <select
          {...register("UserType")}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue="" // Ensures that the field is empty if no option is selected
        >
          
          <option value="Employee">Employee</option>
          <option value="User">User</option>
          <option value="ServiceProvider">ServiceProvider</option>
        </select>
        {errors.UserType && (
          <p className="text-red-500 text-sm mt-1">{errors.UserType.message}</p>
        )}

        {errors.UserType && (
          <p className="text-red-500 text-sm mt-1">{errors.UserType.message}</p>
        )}
      </div>
      <Button className="w-full bg-primary text-white py-2" type="submit">
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
