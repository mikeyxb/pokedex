import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useFetcher } from "react-router";
import type { PokemonData } from "~/routes/pokemon";
import { pokemonTypeColors } from "~/helpers/pokemonTypeColors";
import { ThreeDot } from "react-loading-indicators";

// interface Pokemon {
// 	name: string;
// 	url: string;
// 	image: string;
// }

export default function PokemonList() {
	const [pokemon, setPokemon] = useState<PokemonData[]>([]);
	const [offset, setOffset] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const fetcher = useFetcher<PokemonData[]>();
	const fetcherRef = useRef(fetcher);
	const observerRef = useRef<HTMLDivElement | null>(null);

	// Fetch Pokémon when offset changes
	useEffect(() => {
		console.log("Fetching Pokémon with offset:", offset);
		fetcherRef.current.load(`/pokemon?offset=${offset}`);
	}, [offset]);

	// Handle fetcher response
	useEffect(() => {
		if (fetcher.data && fetcher.state !== "loading") {
			console.log("New Pokémon data:", fetcher.data);
			const newPokemon = fetcher.data;

			setPokemon((prev) => [...prev, ...newPokemon]);
			setLoading(false);
		}
	}, [fetcher.data, fetcher.state]);

	// Infinite Scroll Observer
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !loading) {
					console.log("Fetching more Pokémon...");
					setOffset((prev) => prev + 20);
				}
			},
			{ threshold: 1 },
		);

		if (observerRef.current) observer.observe(observerRef.current);
		return () => observer.disconnect();
	}, [loading]);

	return (
		<div id="pokemon" className="flex flex-col items-center p-4 bg-white min-h-screen text-gray-700 dark:bg-gray-800 dark:text-gray-200">
			<h1 className="text-3xl font-bold mb-6">Pokémon List</h1>

			{/* Pokémon Grid */}
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
				{pokemon.map((pokemon, index) => {
					return (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1 }}
							className="bg-gray-200 rounded-lg shadow-lg p-4 flex flex-col items-center dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
						>
							<img
								src={pokemon.image}
								alt={pokemon.name}
								className="w-20 h-20 mb-2"
								loading="lazy"
							/>
							<p className="text-lg capitalize">{pokemon.name}</p>
							<p className="text-sm text-gray-500">Types</p>
							<div>
								{pokemon.type.map((type, index) => {
									const color = pokemonTypeColors.find(
										(typeColor) => typeColor.type === type,
									)?.color;
									return (
										<span
											key={index}
											className="text-xs text-white text-center m-auto bg-gray-300 dark:bg-gray-600 rounded-lg px-3 py-1 shadow-black/30 shadow-xs mr-1 capitalize"
											style={{ backgroundColor: color }}
										>
											{type}
										</span>
									);
								})}
							</div>
						</motion.div>
					);
				})}
			</div>

			{/* Infinite Scroll Trigger */}
			<div ref={observerRef} className="h-10"></div>
			{fetcher.state === "loading" ? (
				<div
                className="flex items-center justify-center mb-10"
                >
                    <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
                </div>
			) : null}
		</div>
	);
}
