import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function AlreadySignedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  if (!isLoggedIn) return null;

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-md text-yellow-800 mb-4">
      <p className="mb-2 font-medium">Already Logged In</p>
      <Link
        to="/dashboard"
        className="text-blue-600 underline hover:text-blue-800"
      >
        Go to Dashboard?
      </Link>
    </div>
  );
}

export default AlreadySignedIn;
