"use client";
const { createContext, useEffect, useState } = require("react");

export const AuthenticationContext = createContext();

export default function AuthenticationProvider({ children }) {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsValid(false);
    }

    const fetchMe = async () => {
      const user = await fetch("http://localhost:3000/user/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!user) {
        setIsValid(false);
      }
    };

    fetchMe();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ isValid, setIsValid }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
