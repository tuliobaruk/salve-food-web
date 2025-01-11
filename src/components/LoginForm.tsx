import React from "react";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
	email: string;
	password: string;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	setPassword: React.Dispatch<React.SetStateAction<string>>;
	handleSubmit: (e: React.FormEvent) => void;
}

export default function LoginForm({
	email,
	password,
	setEmail,
	setPassword,
	handleSubmit,
}: LoginFormProps) {
	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
				className={styles.input}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				className={styles.input}
			/>
			<button type="submit" className={styles.button}>
				Login
			</button>
		</form>
	);
}
