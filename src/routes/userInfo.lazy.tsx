import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { logout, introspect } from "../api/authService";
import UserInfoDisplay from "../components/UserInfoDisplay";

interface UserInfo {
	name: string;
	email: string;
	roles: string[];
}

export const Route = createLazyFileRoute("/userInfo")({
	component: UserInfoPage,
});

function UserInfoPage() {
	const { isAuthenticated } = useAuth();
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate({ to: "/login" });
			return;
		}

		const fetchUserInfo = async () => {
			try {
				const data = await introspect();
				setUserInfo({
					name: data.name,
					email: data.email,
					roles: data.realm_access?.roles || [],
				});
			} catch (err: unknown) {
				setError(`Failed to fetch user information: ${err}`);
			}
		};

		fetchUserInfo();
	}, [isAuthenticated, navigate]);

	const handleLogout = () => {
		logout();
		navigate({ to: "/login" });
	};

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
			<h2>User Info</h2>
			<UserInfoDisplay userInfo={userInfo} onLogout={handleLogout} />
		</div>
	);
}
