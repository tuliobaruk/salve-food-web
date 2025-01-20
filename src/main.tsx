import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/pages/LoginPage";
import SingupPage from "@/pages/SingupPage";
import TestPage from "@/pages/TestPage";
import Dashboard from "./pages/Dashboard";
import Mapa from "./pages/Mapa";
import Loja from "./pages/Loja";
import Ajuda from "./pages/Ajuda";
import Cardapio from "./pages/Cardapio";
import Configuracoes from "./pages/Configuracoes";
import Entregas from "./pages/Entregas";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/singup",
		element: <SingupPage />,
	},
	{
		path: "/test",
		element: <TestPage />,
	},
	
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
	{
		path: "/mapa",
		element: <Mapa />,
	},
	{
		path: "/loja",
		element: <Loja />,
	},
	{
		path: "/ajuda",
		element: <Ajuda />,
	},
	{
		path: "/cardapio",
		element: <Cardapio />,
	},
	{
		path: "/configuracoes",
		element: <Configuracoes />,
	},
	{
		path: "entregas",
		element: <Entregas />,
	}
	// Rota Temporária, criei para testar a lógica de refresh dos tokens
]);

const rootElement = document.getElementById("root")!;
if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<Toaster position="top-center" />
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</StrictMode>,
	);
}
