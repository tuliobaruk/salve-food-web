import { createBrowserRouter } from "react-router-dom";

// Layouts
import ProtectedRoute from "@/pages/protected/ProtectedRoute";
import SidebarLayout from "@/components/sidebar/sidebar_layout";

// Páginas Públicas
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginPage from "@/pages/LoginPage";
import SingupPage from "@/pages/SingupPage";
import LogoutPage from "@/pages/LogoutPage";

// Páginas Protegidas
import Dashboard from "@/pages/protected/Dashboard";
import CreateStorePage from "@/pages/protected/CreateStorePage";
import Pedidos from "@/pages/protected/PedidosPage";
import CreateItemPage from "@/pages/protected/CreateItemPage";
import EditItemPage from "@/pages/protected/EditItemPage";
import ItemListPage from "@/pages/protected/ItemListPage";
import DriverListPage from "@/pages/protected/DriverListPage";

const router = createBrowserRouter([
	// Rotas Públicas
	{
		path: "/",
		element: <HomePage />,
		errorElement: <NotFoundPage />,
	},
	{
		path: "/singup",
		element: <SingupPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/logout",
		element: <LogoutPage />,
	},

	// Grupo de Rotas Protegidas, adicionar novas como children
	{
		path: "/",
		element: <ProtectedRoute />,
		children: [
			{
				path: "criar-loja",
				element: <CreateStorePage />,
			},
			{
				path: "dashboard",
				element: (
					<SidebarLayout>
						<Dashboard />
					</SidebarLayout>
				),
			},
			{
				path: "pedidos",
				element: (
					<SidebarLayout>
						<Pedidos />
					</SidebarLayout>
				),
			},
			{
				path: "cardapio",
				element: (
					<SidebarLayout>
						<ItemListPage />
					</SidebarLayout>
				),
			},
			{
				path: "criar-item",
				element: (
					<SidebarLayout>
						<CreateItemPage />
					</SidebarLayout>
				),
			},
			{
				path: "editar-item/:id",
				element: (
					<SidebarLayout>
						<EditItemPage />
					</SidebarLayout>
				),
			},
			{
				path: "entregadores",
				element: (
					<SidebarLayout>
						<DriverListPage/>
					</SidebarLayout>
				)
			}
		],
	},
]);

export default router;
