import { StrictMode } from "react";
import { AuthProvider } from "./context/AuthContext";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root")!;
if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<AuthProvider>
				<App />
			</AuthProvider>
		</StrictMode>,
	);
}
