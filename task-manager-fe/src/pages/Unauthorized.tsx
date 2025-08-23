import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
      <p className="text-4xl italic mb-6">You don’t have access to this page.</p>
      <Link
        to="/signup"
        className="mb-6 px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
      >
        Sign Up
      </Link>
      <Link
        to="/login"
        className="mb-6 px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
      >
        Sign In
      </Link>
      <Link
        to="/"
        className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
