// src/components/UserInfoDisplay.tsx

interface UserInfo {
	name: string;
	email: string;
	roles: string[];
}

interface UserInfoDisplayProps {
	userInfo: UserInfo | null;
	onLogout: () => void;
}

export default function UserInfoDisplay({ userInfo, onLogout }: UserInfoDisplayProps) {
	if (!userInfo) {
		return <p>Loading user information...</p>;
	}

	return (
		<div>
			<p>
				<strong>Name:</strong> {userInfo.name}
			</p>
			<p>
				<strong>Email:</strong> {userInfo.email}
			</p>
			<p>
				<strong>Roles:</strong> {userInfo.roles.join(", ")}
			</p>
			<button onClick={onLogout}>Logout</button>
		</div>
	);
}
