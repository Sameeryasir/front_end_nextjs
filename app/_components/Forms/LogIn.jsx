"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import Link from "next/link";
import { AuthenticationContext } from "@/app/context/authentication";

const schema = z.object({
  Email: z.string().email("Invalid email format").nonempty("Email is required"),
  Password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .nonempty("Password is required"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const [loginError, setLoginError] = useState(null);
  const { isValid, setIsValid } = useContext(AuthenticationContext);

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
      console.log("Response Data:", responseData); // Log response data
  
      localStorage.setItem("token", responseData.token);
      setIsValid(true);
  
      // Debug UserType
      console.log("UserType:", responseData.UserType);
  
      if (responseData.UserType === "Admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setLoginError("Invalid email or password.");
    }
  };
  

  return (
    <section className="h-screen flex items-start justify-center bg-gray-100 pt-16">
      <div className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
        <div className="w-full">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-full object-contain"
            alt="Sample"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Email:</label>
            <input
              {...register("Email")}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.Email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Email.message}
              </p>
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
              <p className="text-red-500 text-sm mt-1">
                {errors.Password.message}
              </p>
            )}
          </div>

          <div className="mb-6 flex items-center justify-between">
            <Checkbox id="rememberMe" label="Remember me" />
            <a href="#!" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {loginError && (
            <p className="text-red-500 text-sm mt-1">{loginError}</p>
          )}

          <Button
            className="w-full bg-primary text-white py-2 rounded-md "
            type="submit"
          >
            Log In
          </Button>

          <Link href="/signUp">
            <p className="mb-0 mt-2 pt-1 text-sm font-semibold text-primary">
              Don't have an account?{" "}
              <a
                href="#!"
                className="text-primary transition duration-150 ease-in-out"
              >
                Register
              </a>
            </p>
          </Link>
        </form>
      </div>
    </section>
  );
};

const Checkbox = ({ id, label }) => (
  <div className="flex items-center">
    <input className="form-checkbox text-primary" type="checkbox" id={id} />
    <label className="ml-2" htmlFor={id}>
      {label}
    </label>
  </div>
);

export default LoginForm;
