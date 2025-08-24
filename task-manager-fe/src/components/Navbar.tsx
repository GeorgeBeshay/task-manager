import {Link, useNavigate} from "react-router-dom";
import {use, useEffect, useState} from "react";
import {AuthContext} from "@/context/AuthContext.tsx";
import type {User} from "@/model/User.ts";

export function Navbar() {
  // --------------------- Context ---------------------
  const authContext = use(AuthContext);

  // --------------------- States ---------------------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // --------------------- Functions ---------------------
  const navigate = useNavigate();

  const handleLogout = () => {

    console.log(authContext.user);

    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    authContext.setAccessToken(null);
    authContext.setUser(null);

    void navigate("/login");
  };

  // --------------------- Hooks ---------------------
  useEffect(() => {
    setIsLoggedIn(authContext.accessToken != null);
    setUser(authContext.user);
  }, [authContext]);

  // --------------------- JSX ---------------------
  return (
    <nav className="w-full bg-auto shadow-md fixed top-0 left-0 flex justify-between items-center px-6 py-3 z-50">
      <div className="flex items-center space-x-2">
        <Link to="/" className="text-xl font-bold">
          <span className="italic">Sch</span>edy
        </Link>
        <span className="text-gray-100 text-sm">– Your personal task manager</span>
      </div>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <span className="text-sm text-gray-200">{user?.fullName}</span>
            <Link
              to="/dashboard"
              className="px-3 py-1 rounded border hover:bg-gray-100 transition"
            >
              Dashboard
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 rounded border hover:bg-gray-100 transition"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-3 py-1 rounded border hover:bg-gray-100 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
