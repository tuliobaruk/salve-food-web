import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import salveImage from "@/assets/images/salve-food-largo.png";
import comidas from "@/assets/images/comidas.png";

export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between bg-[#f9f5f1] p-6 md:p-10">
			{/* Cabeçalho */}
			<header className="w-full flex justify-between items-center max-w-5xl mx-auto">
				<div className="text-2xl font-bold flex items-center gap-2">
					<img
						src={salveImage}
						alt="SalveFood"
						className="w-20 h-20"
					/>
					<span>SalveFood</span>
				</div>

				<nav className="flex gap-6 text-lg">
					<a href="#" className="text-gray-700 hover:text-gray-900">
						Home
					</a>
					<a href="#faq" className="text-gray-700 hover:text-gray-900">
						FAQ
					</a>
					<a href="#contact" className="text-gray-700 hover:text-gray-900">
						Contato
					</a>
				</nav>
			</header>

			{/* Seção principal */}
			<main className="w-full flex flex-col items-center max-w-5xl mx-auto mt-12">
				<div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
					{/* Texto principal */}
					<div className="flex flex-col items-start text-center md:text-left">
						<h1 className="text-5xl font-extrabold text-orange-500">
							Salve <span className="text-gray-900">Food</span>
						</h1>
						<p className="text-xl text-gray-600 mt-4">
							Bateu aquela fome? Dá um Salve!
						</p>
						<Link to="/login">
							<Button
								type="button"
								className="mt-6 px-8 py-4 bg-gray-900 text-white text-lg rounded-lg shadow-lg hover:bg-gray-700"
							>
								Conectar-se
							</Button>
						</Link>
					</div>


					<div className="flex-shrink-0">
						<img
							src={comidas}
							alt="Fast Food"
							className="w-full max-w-lg"
						/>
					</div>
				</div>
			</main>
		</div>
	);
}
