import { SquareMenu, Home, Inbox, Bike, Settings, LogOut, CircleHelp  } from "lucide-react";

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

// Menu items.
const items = [
	{
		title: "Início",
		url: "/",
		icon: Home,
	},
	{
		title: "Pedidos",
		url: "/dashboard",
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
		url: "#",
		icon: LogOut,
	},
]

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
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
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
											<a href={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</a>
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
