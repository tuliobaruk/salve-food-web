import { SquareMenu, Home, Inbox, Bike, Settings, LogOut, CircleHelp } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";

// Menu items.
const items = [
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
		url: "#",
		icon: SquareMenu,
	},
	{
		title: "Entregas",
		url: "#",
		icon: Bike,
	},
	{
		title: "Ajuda",
		url: "#",
		icon: CircleHelp,
	},
];

const footerItems = [
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

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Nome do restaurante</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<div className="mt-auto">
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu>
								{footerItems.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<Link to={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</div>
			</SidebarContent>
		</Sidebar>
	);
}
