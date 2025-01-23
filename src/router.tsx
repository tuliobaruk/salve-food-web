import { createBrowserRouter } from "react-router-dom";

// Sidebar

import SidebarLayout from "@/components/global_layout";

// Páginas

import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/pages/LoginPage";
import SingupPage from "@/pages/SingupPage";
import TestPage from "@/pages/TestPage";
import Dashboard from "@/pages/Dashboard";
import CreateStorePage from "@/pages/CreateStorePage";
import Pedidos from "@/pages/PedidosPage";
import LogoutPage from "@/pages/LogoutPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: "/logout",
		element: <LogoutPage />,
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
		element: (
			<SidebarLayout>
				<Dashboard />,
			</SidebarLayout>
		),
	},
	{
		path: "/pedidos",
		element: (
			<SidebarLayout>
				<Pedidos />,
			</SidebarLayout>
		),
	},
	{
		path: "/createStore",
		element: <CreateStorePage />,
	},
	// Rota Temporária, criei para testar a lógica de refresh dos tokens
]);

export default router;
