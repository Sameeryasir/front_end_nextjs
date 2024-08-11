
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/logIn");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
