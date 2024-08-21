"use client";
import Link from "next/link"; // Import Link from Next.js
import { Button } from "@/components/ui/button";

export default function HeaderAdmin() { // Capitalized component name

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsValid(false);
  };

  const isLoggedIn = () => {
    let token = localStorage.getItem("token");
    return !!token;
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <div>
        {isLoggedIn() ? (
          <Button
            onClick={handleLogout}
            className="hover:scale-105 transition-all ease-in-out"
          >
            Log Out
          </Button>
        ) : (
          <Link href="/logIn">
            <Button className="hover:scale-105 transition-all ease-in-out">
              Log In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
