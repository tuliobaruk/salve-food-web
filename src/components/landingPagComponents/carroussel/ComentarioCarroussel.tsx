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
      name: "João Silva",
      comment: "Uso o SalveFood todos os dias, sempre entregam no prazo!",
      avatar:
        "https://img.freepik.com/fotos-gratis/vista-frontal-homem-sorridente-tomando-selfie_23-2149556994.jpg?ga=GA1.1.647953801.1737834046&semt=ais_hybrid",
    },
    {
      name: "Maria Oliveira",
      comment: "Adoro as promoções e a variedade de opções disponíveis.",
      avatar:
        "https://img.freepik.com/fotos-gratis/jovem-feliz-tirando-foto-de-selfie-ao-ar-livre_1262-19167.jpg?ga=GA1.1.647953801.1737834046&semt=ais_hybrid",
    },
    {
      name: "Carlos Lima",
      comment: "O melhor app de delivery que já usei!",
      avatar:
        "https://img.freepik.com/fotos-gratis/botanico-ou-biologo-barbudo-de-meia-idade-usando-chapeu-panama_273609-6319.jpg?ga=GA1.1.647953801.1737834046&semt=ais_hybrid",
    },
    {
      name: "Ana Costa",
      comment: "Recomendo a todos, é rápido e confiável.",
      avatar:
        "https://img.freepik.com/fotos-gratis/jovem-negra-com-cabelo-afro-rindo-e-curtindo_150588-161.jpg?ga=GA1.1.647953801.1737834046&semt=ais_hybrid",
    },
    {
      name: "Paulo Souza",
      comment: "Excelentes descontos e entregas sempre pontuais!",
      avatar:
        "https://img.freepik.com/fotos-gratis/conceito-de-pessoas-viagens-e-aventura-jovem-e-atraente-barbudo-aventureiro-usando-mochila-e-bone-tirando-selfie_273609-1860.jpg?ga=GA1.1.647953801.1737834046&semt=ais_hybrid",
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
        }}
      >
        {comentarios.map((testimonial, index) => (
          <CarouselItem key={index} className="p-2">
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
