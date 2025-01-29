import { SquareMenu, Home, Inbox, Bike, Settings, LogOut, CircleHelp, Users } from "lucide-react";

// Menu items.
export const topItems = [
	{
		title: "Início",
		url: "/dashboard",
		icon: Home,
	},
	{
		title: "Pedidos",
		url: "/pedidos",
		icon: Inbox,
	},
	{
		title: "Cardápio",
		url: "/cardapio",
		icon: SquareMenu,
	},
	{
		title: "Entregas",
		url: "#",
		icon: Bike,
	},
	{
		title: "Motorista",
		url: "/motoristas",
		icon: Users,
	},
	{
		title: "Ajuda",
		url: "#",
		icon: CircleHelp,
	},
];

export const footerItems = [
	{
		title: "Configurações",
		url: "#",
		icon: Settings,
	},
	{
		title: "Sair",
		url: "/logout",
		icon: LogOut,
	},
];
