import {
	SquareMenu,
	Home,
	Inbox,
	Bike,
	Settings,
	LogOut,
	// CircleHelp,
	PackageCheckIcon,
} from "lucide-react";

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
		title: "Entregadores",
		url: "/entregadores",
		icon: Bike,
	},
	{
		title: "Histórico de Entregas",
		url: "/historico",
		icon: PackageCheckIcon,
	},
	// {
	// 	title: "Ajuda",
	// 	url: "#",
	// 	icon: CircleHelp,
	// },
];

export const footerItems = [
	{
		title: "Configurações",
		url: "/configuracoes",
		icon: Settings,
	},
	{
		title: "Sair",
		url: "/logout",
		icon: LogOut,
	},
];
