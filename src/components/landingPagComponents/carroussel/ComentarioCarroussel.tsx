import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/landingPagComponents/carroussel/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/landingPagComponents/carroussel/avatar";

export default function ComentarioCarroussel() {
  const comentarios = [
    {
      name: "Boteco do Professor",
      comment: "A plataforma SalveFood fez nossa entrega mais eficiente e aumentou nossas vendas.",
      avatar: "https://i.ibb.co/gv5rpLs/botecodoprofessor.jpg",
    },
    {
      name: "Brazzetus",
      comment: "O processo de cadastro é simples e o suporte ao cliente é excelente!",
      avatar: "https://i.ibb.co/r7HHNVq/brazzetus.jpg",
    },
    {
      name: "Dominos Pizzaria",
      comment: "Com a SalveFood, conseguimos alcançar muito mais clientes e aumentar a visibilidade da nossa marca.",
      avatar: "https://i.ibb.co/0jyw2tj/dominos.jpg",
    },
    {
      name: "Gildo Lanches",
      comment: "A plataforma é super fácil de usar e as entregas são feitas rapidamente!",
      avatar: "https://i.ibb.co/5YYrcKt/gildo.png",
    },
    {
      name: "Pappa Johns Pizzaria",
      comment: "Os descontos exclusivos ajudaram a fidelizar ainda mais nossos clientes.",
      avatar: "https://i.ibb.co/NTgbnLH/papajohns.png",
    },
    {
      name: "Porcão",
      comment: "A SalveFood oferece uma excelente plataforma de gestão de pedidos.",
      avatar: "https://i.ibb.co/1ntkyxm/porcao.png",
    },
    {
      name: "Spettus",
      comment: "Recomendo a plataforma para todos os restaurantes! Aumentou nossa produtividade.",
      avatar: "https://i.ibb.co/6bydgkt/speetus.png",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % comentarios.length);
    }, 3000);

    return () => clearInterval(intervalo);
  }, [comentarios.length]);

  return (
    <Carousel className="w-full max-w-2xl mx-auto">
      <CarouselContent
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: "transform 0.5s ease-in-out",
          padding: '0 10px',
        }}
      >
        {comentarios.map((testimonial, index) => (
          <CarouselItem key={index} className="p-2 overflow-hidden">
            <Card className="shadow-lg">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Avatar className="w-16 h-16 mb-4">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <p className="text-gray-600 italic mb-2">"{testimonial.comment}"</p>
                <p className="text-gray-900 font-bold">- {testimonial.name}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-between mt-4">
        <CarouselPrevious
          className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
          onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + comentarios.length) % comentarios.length)}
        />
        <CarouselNext
          className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
          onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % comentarios.length)}
        />
      </div>
    </Carousel>
  );
}
