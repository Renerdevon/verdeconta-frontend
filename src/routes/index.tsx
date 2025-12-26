import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { useAuth } from "../contexts/useAuth";
import type { ReactNode } from "react";

function PrivateRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/" element={<Login />} />

        {/* Rota protegida */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
