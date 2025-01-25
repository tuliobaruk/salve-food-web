import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import salveImage from "@/assets/images/salve-food-largo.png";
import comidas from "@/assets/images/comidas.png";
import googlePlay from "@/assets/images/google-play.png";
import appStore from "@/assets/images/app-store.png";
import ComentarioCarroussel from "@/components/landingPagComponents/carroussel/ComentarioCarroussel";
export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col items-center bg-[#f9f5f1]">
			{/* Cabeçalho */}
			<header className="w-full h-20 fixed top-0 left-0 right-0 z-50 flex justify-between items-center max-w-full mx-auto py-6 px-4 md:px-10 bg-[#D9D9D9]">
				<div className="text-2xl font-bold flex items-center gap-2">
					<img src={salveImage} alt="SalveFood" className="w-16 h-16" />
					<span>SalveFood</span>
				</div>

				<nav className="flex gap-6 text-lg">
					<a href="#" className="text-gray-700 hover:text-gray-900">
						Home
					</a>
					<a href="#about" className="text-gray-700 hover:text-gray-900">
						Sobre
					</a>
					<a href="#features" className="text-gray-700 hover:text-gray-900">
						Recursos
					</a>
					<a href="#contact" className="text-gray-700 hover:text-gray-900">
						Contato
					</a>
				</nav>
			</header>

			{/* Conteúdo principal */}
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
							<Link to="/signup">
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

				{/* Sobre */}
				<section id="about" className="mt-16 text-center md:text-left">
					<h2 className="text-3xl font-bold text-gray-900">Sobre o SalveFood</h2>
					<p className="text-lg text-gray-600 mt-4">
						SalveFood é um app de delivery que conecta você aos melhores restaurantes e lanchonetes
						da sua região. Rápido, confiável e com descontos incríveis.
					</p>
				</section>

				{/* Recursos */}
				<section id="features" className="mt-16">
					<h2 className="text-3xl font-bold text-gray-900 text-center md:text-left">
						Por que escolher o SalveFood?
					</h2>
					<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
						<Card>
							<CardHeader>
								<h3 className="text-xl font-semibold text-orange-500">Entrega Rápida</h3>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									Receba seu pedido em minutos, com entrega confiável.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<h3 className="text-xl font-semibold text-orange-500">Descontos Exclusivos</h3>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">Economize com promoções e cupons de desconto.</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<h3 className="text-xl font-semibold text-orange-500">Variedade de Opções</h3>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">Escolha entre centenas de restaurantes.</p>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* Comentáarios */}
				<section id="testimonials" className="mt-16 text-center">
					<h2 className="text-3xl font-bold text-gray-900">O que nossos clientes dizem</h2>
					<ComentarioCarroussel />
				</section>

				{/*Seção Final */}
				<section id="cta" className="mt-16 text-center">
					<h2 className="text-3xl font-bold text-gray-900">Baixe o nosso App no Smartphone</h2>
					<p className="text-lg text-gray-600 mt-4">
						Disponível para Android e IOS. Experimente a melhor experiência de delivery.
					</p>
					<div className="flex gap-4 mt-6 justify-center">
						<a href="https://play.google.com/store/apps" target="_blank"><img src={googlePlay} alt="Google Play" className="w-35 h-10 cursor-pointer" /></a>
						<a href="https://www.apple.com/br/app-store/" target="_blank"><img src={appStore} alt="App Store" className="w-35 h-10 cursor-pointer" /></a>
					</div>
				</section>
			</main>
			<footer className="w-full py-4">
				<div className="flex justify-between items-center max-w-full mx-auto px-4 md:px-10">
					<span className="text-gray-700">
						Copyright © 2025 SalveFood. Todos os direitos reservados.
					</span>
					<a href="https://www.instagram.com/salvefood.ofc/" target="_blank" rel="noopener noreferrer">
						<img src="/src/assets/images/instagram.png" alt="Instagram" className="w-8 h-8" />
					</a>
				</div>
			</footer>
		</div>
	);
}
