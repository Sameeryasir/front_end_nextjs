"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const schema = z.object({
  Email: z.string().email().nonempty("Email is required"),
  Password: z.string().min(6, "Password must be at least 6 characters long").nonempty("Password is required"),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

 const router =useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
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
      console.log("Login successful:", responseData);

      // Save the token (for demonstration purposes using localStorage)
      localStorage.setItem("token", responseData.token);

      // Redirect to the dashboard
      router.push('/');
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto p-4 bg-white shadow-md rounded-md pt-5"
    >
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
      <Button className="w-full bg-primary text-white py-2" type="submit">
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
