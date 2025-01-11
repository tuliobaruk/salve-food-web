import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import LoginForm from "../components/LoginForm";

export const Route = createLazyFileRoute("/login")({
	component: Login,
});

function Login() {
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(email, password);
			navigate({ to: "/userInfo" });
		} catch (error) {
			console.error("Falha ao logar", error);
		}
	};
	return (
		<div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
			<LoginForm
				email={email}
				password={password}
				setEmail={setEmail}
				setPassword={setPassword}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
}
