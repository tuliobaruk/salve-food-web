const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;

export async function fetchCoordinates(address: string) {
	try {
		const encodedAddress = encodeURIComponent(address);
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAP_KEY}`,
		);

		if (!response.ok) {
			throw new Error(`Erro na requisição: ${response.statusText}`);
		}

		const data = await response.json();

		if (data.status !== "OK") {
			throw new Error(`Erro do Google Maps API: ${data.error_message || "Status não OK"}`);
		}

		const location = data.results[0]?.geometry?.location;

		if (!location) {
			throw new Error("Nenhuma localização encontrada para o endereço fornecido.");
		}

		return location;
	} catch (error) {
		console.error("Erro ao buscar coordenadas:", error);
		throw error;
	}
}
