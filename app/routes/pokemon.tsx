// routes/pokemon.tsx
import { PokemonClient, type NamedAPIResourceList } from 'pokenode-ts';
import { type LoaderFunctionArgs } from 'react-router'

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export type PokemonData = {
	id: number;
	name: string;
	url: string;
	image: string;
	type: string[];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const offset = url.searchParams.get("offset") || "0";
	const api = new PokemonClient();
	const type = url.searchParams.get("type") || "all";

	try {
		// const response = await fetch(`${API_URL}?limit=20&offset=${offset}`);
		const pokemonList: NamedAPIResourceList = await api.listPokemons(
			parseInt(offset),
			20,
		);
		if (!pokemonList) throw new Error("Failed to fetch Pokémon data");
		console.log("pokelist : ", pokemonList);
		const pokeData: PokemonData[] = [];
		await Promise.all(
			pokemonList.results.map(async ({ name, url }) => {
				const pokemon = await api.getPokemonByName(name);
				pokeData.push({
					id: pokemon.id,
					name,
					url,
					image: pokemon.sprites.front_default || "",
					type: pokemon.types.map((type) => type.type.name),
				});
			}),
		);

		const listOfTypes = await api.listTypes()
		console.log("listOfTypes : ", listOfTypes)

		pokeData.sort((a, b) => a.id - b.id);
		return {pokeData, listOfTypes};

		// if (!response.ok) throw new Error("Failed to fetch Pokémon data");
		// const data = await response.json();
		// return data;
	} catch (error) {
		console.log("error : ", error);
		return { error };
	}
}
