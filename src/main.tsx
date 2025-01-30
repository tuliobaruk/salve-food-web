import ReactDOM from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import { Toaster } from "sonner";

import { AuthProvider } from "@/context/AuthContext";
import { LojaProvider } from "./context/LojaContext";
import { RouterProvider } from "react-router-dom";
import router from "@/router";

const rootElement = document.getElementById("root")!;
if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<Toaster position="top-center" />
			<AuthProvider>
				<LojaProvider>
					<RouterProvider router={router} />
				</LojaProvider>
			</AuthProvider>
		</StrictMode>,
	);
}
