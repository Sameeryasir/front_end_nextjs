import React from "react";
import Sidebar from "./_components/Sidebar";
import HeaderAdmin from "./_components/HeaderAdmin";
import AuthenticationProvider from "@/app/context/authentication";

export const metadata = {
  title: "Admin Panel",
  description: "Admin Panel Layout",
};

export default function AdminLayout({ children }) {
  return (
    <AuthenticationProvider>
      <div className="flex bg-gray-100 min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <HeaderAdmin />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </AuthenticationProvider>
  );
}
