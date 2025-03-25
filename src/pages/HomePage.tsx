import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import salveImage from "@/assets/images/salve-food-largo.png";
import comidas from "@/assets/images/comidas.png";

import ComentarioCarroussel from "@/components/landingPagComponents/carroussel/ComentarioCarroussel";
import { Instagram } from "lucide-react";

export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col items-center bg-[#f9f5f1]">
			<header className="w-full h-20 fixed top-0 left-0 right-0 z-50 flex justify-between items-center max-w-full mx-auto py-6 px-4 md:px-10 bg-[#F9F5F1]/50 backdrop-blur-md">
				<div className="text-2xl font-bold flex items-center gap-2">
					<img src={salveImage} alt="SalveFood" className="w-16 h-16" />
					<span>SalveFood</span>
				</div>

				<nav className="flex gap-6 text-lg">
					<a
						href="#"
						className="text-gray-700 px-3 py-2 rounded-md transition duration-300 hover:bg-orange-500 hover:bg-opacity-100 hover:text-white"
					>
						Home
					</a>
					<a
						href="#about"
						className="text-gray-700 px-3 py-2 rounded-md transition duration-300 hover:bg-orange-500 hover:bg-opacity-100 hover:text-white"
					>
						Sobre
					</a>
					<a
						href="#features"
						className="text-gray-700 px-3 py-2 rounded-md transition duration-300 hover:bg-orange-500 hover:bg-opacity-100 hover:text-white"
					>
						Recursos
					</a>
					<a
						href="#contact"
						className="text-gray-700 px-3 py-2 rounded-md transition duration-300 hover:bg-orange-500 hover:bg-opacity-100 hover:text-white"
					>
						Contato
					</a>
				</nav>
			</header>

			<main className="w-full flex flex-col items-center max-w-6xl mx-auto mt-32 px-4 ">
				<section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
					<div className="flex flex-col items-start text-center md:text-left">
						<h1 className="text-5xl font-extrabold text-orange-500 flex justify-between">
							<span>Salve</span> <span className=" text-gray-900 pb-0">Food</span>
							<span className="block text-gray-900 text-xl">Delivery</span>
						</h1>
						<p className="text-xl text-gray-600 mt-4">Bateu aquela fome? Dá um Salve!</p>
						<div className="flex gap-4 mt-6">
							<Link to="/login">
								<Button className="px-6 py-3 text-lg">Entrar no Portal</Button>
							</Link>
							<Link to="/singup">
								<Button className="px-6 py-3 bg-orange-500 text-white text-lg hover:bg-orange-400">
									Cadastre sua loja
								</Button>
							</Link>
						</div>
					</div>
					<div className="flex-shrink-0">
						<img src={comidas} alt="Fast Food" className="w-full max-w-lg" />
					</div>
				</section>

				<section id="about" className="mt-16 text-center md:text-left">
					<h2 className="text-3xl font-bold text-gray-900">Sobre o SalveFood</h2>
					<p className="text-lg text-gray-600 mt-4">
						SalveFood é um portal dedicado a conectar restaurantes e lanchonetes aos clientes,
						oferecendo uma plataforma fácil e rápida para empresas de alimentação se cadastrarem e
						gerenciarem seus pedidos. Nossa missão é ajudar pequenos e médios empresários a
						expandirem seu alcance e atenderem seus clientes de maneira eficiente, com a vantagem de
						contar com uma plataforma intuitiva e segura.
					</p>
				</section>

				<section id="features" className="mt-16">
					<h2 className="text-3xl font-bold text-gray-900 text-center md:text-left">
						Por que escolher o SalveFood?
					</h2>
					<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
						<Card>
							<CardHeader>
								<h3 className="text-xl font-semibold text-orange-500">Facilidade de Cadastro</h3>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									Cadastre sua empresa de forma simples e rápida, sem burocracia.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<h3 className="text-xl font-semibold text-orange-500">
									Gestão de Pedidos Eficiente
								</h3>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									Gerencie seus pedidos de forma simples e sem erros, garantindo agilidade no
									processo.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<h3 className="text-xl font-semibold text-orange-500">Apoio e Suporte</h3>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									Conte com nosso suporte dedicado para ajudar sua empresa a crescer dentro da
									plataforma.
								</p>
							</CardContent>
						</Card>
					</div>
				</section>

				<section id="testimonials" className="mt-16 text-center">
					<h2 className="text-3xl font-bold text-gray-900">O que nossos clientes dizem</h2>
					<ComentarioCarroussel />
				</section>
			</main>
			<footer className="w-full py-4">
				<div className="flex flex-col items-center max-w-full mx-auto px-4 md:px-10">
					<span className="text-gray-700 mb-2">
						Copyright ©2025 SalveFood. Todos os direitos reservados.
					</span>
					<a
						href="https://www.instagram.com/salvefood.ofc/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div>
							<Instagram size={32} className="text-gray-700 hover:text-gray-900" />
						</div>
					</a>
				</div>
			</footer>
		</div>
	);
}
