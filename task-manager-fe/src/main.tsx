import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@/index.css'
import App from '@/App.tsx'
import SignupPage from "@/pages/SignUp.tsx";
import NotFoundPage from "@/pages/NoutFound.tsx";
import DashboardPage from "@/pages/Dashboard.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import SignInPage from "@/pages/SignIn.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
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
    </BrowserRouter>
  </StrictMode>,
)
