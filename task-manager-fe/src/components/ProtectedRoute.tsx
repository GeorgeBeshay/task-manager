import type {JSX} from "react";
import Unauthorized from "@/pages/Unauthorized.tsx";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('access_token'); // JWT stored on login/signup

  if (!token) {
    // Redirect to signin page if no token
    return <Unauthorized />;
  }

  return children;
};

export default ProtectedRoute;
