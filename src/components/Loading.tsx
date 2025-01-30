import { Loader } from "lucide-react";

export function Loading() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<div className="flex flex-col items-center gap-2">
				<Loader className="w-8 h-8 animate-spin text-gray-600" />
				<p className="text-gray-600 text-sm">Carregando...</p>
			</div>
		</div>
	);
}
