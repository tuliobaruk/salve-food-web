/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

interface SegmentoLoja {
	id: number;
	nome: string;
	emoji: string;
}

interface Loja {
	id: number;
	nome: string;
	descricao: string;
	rua: string;
	numero: string;
	bairro: string;
	cidade: string;
	estado: string;
	segmentoLoja: SegmentoLoja;
	longitude: number;
	latitude: number;
	image: string;
	rating: number | null;
	deliveryTime: number | null;
  horarioAbertura: string;
  horarioFechamento: string;
}

interface LojaContextProps {
	loja: Loja | null;
	setLoja: (loja: Loja) => void;
	clearLoja: () => void;
}

const LojaContext = createContext<LojaContextProps | undefined>(undefined);

export const LojaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [loja, setLojaState] = useState<Loja | null>(() => {
		const storedLoja = localStorage.getItem("loja");
		return storedLoja ? JSON.parse(storedLoja) : null;
	});

	const setLoja = (loja: Loja) => {
		setLojaState(loja);
		localStorage.setItem("loja", JSON.stringify(loja));
	};

	const clearLoja = () => {
		setLojaState(null);
		localStorage.removeItem("loja");
	};

	useEffect(() => {
		if (loja) {
			localStorage.setItem("loja", JSON.stringify(loja));
		}
	}, [loja]);

	return (
		<LojaContext.Provider value={{ loja, setLoja, clearLoja }}>{children}</LojaContext.Provider>
	);
};

export const useLoja = () => {
	const context = useContext(LojaContext);
	if (!context) {
		throw new Error("useLoja must be used within a LojaProvider");
	}
	return context;
};
