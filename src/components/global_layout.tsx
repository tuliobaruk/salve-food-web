import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<div className="flex h-screen w-screen">
				<AppSidebar />
				<div className="flex-1 flex flex-col">
					<SidebarTrigger />
					<main className="flex-1 overflow-auto">{children}</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
