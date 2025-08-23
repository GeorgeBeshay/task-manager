import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-4xl italic mb-6">Oops! The page you're looking for does not exist.</p>

      <Link
        to="/"
        className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
