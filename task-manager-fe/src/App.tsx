import '@/App.css'
import { Link } from "react-router-dom";


function App() {
  return (
    <div className="h-screen flex flex-col justify-center p-6 space-y-8">
      <h1 className="text-3xl italic mb-6">
        <span className='font-bold'>Sch</span>edy
      </h1>
      <p className="text-lg mb-2">Welcome to Schedy, your personal task manager.</p>

      <div className="mb-8">
        <p className="mb-4">Get started by creating your account.</p>
        <Link
          to="/signup"
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
        >
          Sign Up
        </Link>
      </div>

      <div>
        <p className="text-sm mb-4">Already having an account?</p>
        <Link
          to="/login"
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
        >
          Log In
        </Link>
      </div>
    </div>
  );

}

export default App
