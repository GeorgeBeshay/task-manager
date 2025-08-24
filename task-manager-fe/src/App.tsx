import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navbar} from "@/components/Navbar.tsx";
import HomePage from "@/pages/Home.tsx";
import SignupPage from "@/pages/SignUp.tsx";
import SignInPage from "@/pages/SignIn.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import DashboardPage from "@/pages/Dashboard.tsx";
import NotFoundPage from "@/pages/NoutFound.tsx";
import {AuthProvider} from "@/context/AuthContext.tsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<SignInPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;