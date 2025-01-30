import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";
import { footerItems, topItems } from "@/components/sidebar/sidebar_items";
import { useLoja } from "@/context/LojaContext";

export default function AppSidebar() {
	const { loja } = useLoja();

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<div className="flex items-center gap-4">
								{loja?.image && (
									<img
										src={loja.image}
										alt={loja.nome}
										className="w-12 h-12 rounded-lg object-cover bg-gray-200"
									/>
								)}
								<div className="flex flex-col">
									<span className="font-semibold text-lg text-gray-800">
										{loja?.nome || "Nome do Restaurante"}
									</span>
								</div>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{topItems.map((item) => (
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
				</SidebarGroup>

				<div className="mt-auto">
					<SidebarGroup>
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
					</SidebarGroup>
				</div>
			</SidebarContent>
		</Sidebar>
	);
}
