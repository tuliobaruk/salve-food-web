import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuth();
	return (
		<SidebarProvider>
			<div className="flex h-screen w-screen">
				{isAuthenticated && <AppSidebar />}
				<div className="flex-1 flex flex-col">
					{isAuthenticated && <SidebarTrigger />}
					<main className="flex-1 overflow-auto">{children}</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
