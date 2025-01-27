import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute() {
	const { isAuthenticated, user } = useAuth();

	if (!isAuthenticated || !user) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}
