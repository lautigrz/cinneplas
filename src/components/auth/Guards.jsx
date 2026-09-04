import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/useAuth";
import LoadingSpinner from "../ui/LoadingSpinner";

export function AdminGuard() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner message="Verificando permisos de administración..." />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export function AuthGuard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
