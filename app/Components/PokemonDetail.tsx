import React, { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { Skeleton } from "./ui/skeleton";

export default function PokemonDetail({ id }: { id: number }) {
	const fetcher = useFetcher();

	// store the pokemon data in state
	const [pokemon, setPokemon] = useState<any>(null);

	// when the component mounts, fetch the pokemon data
	useEffect(() => {
		const formData = new FormData();
		formData.append("id", id.toString());
		formData.append("_action", "getPokemonById");
		console.log("Submitting form data:", formData);
		fetcher.submit(formData, { method: "post", action: "/myPokemon" });
	}, [id]);

	// Handle fetcher response
	useEffect(() => {
		console.log("fetcher state:", fetcher.state);
		console.log("fetcher data:", fetcher.data);
		if (fetcher.data && fetcher.state !== "loading") {
			// console.log("New Pokémon data:", fetcher.data);
			setPokemon(fetcher.data);
		}
	}, [fetcher.data, fetcher.state]);
	const HP = pokemon?.stats.find((stat: any) => stat.stat.name === "hp");
	const types = pokemon?.types[0].type.name;
	console.log("types : ", types);

	const typeBgImage = () => {
		switch (types) {
			case "fire":
				return "url(/images/backgrounds/orange.png)";
			case "water":
				return "url(/images/backgrounds/blue.png)";
			case "grass":
				return "url(/images/backgrounds/green.png)";
			case "electric":
				return "url(/images/backgrounds/yellow.png)";
			case "psychic":
				return "url(/images/backgrounds/purple.png)";
			case "ice":
				return "url(/images/backgrounds/white.png)";
			case "dragon":
				return "url(/images/backgrounds/orange.png)";
			case "dark":
				return "url(/images/backgrounds/purple.png)";
			case "fairy":
				return "url(/images/backgrounds/purple.png)";
			case "normal":
				return "url(/images/backgrounds/yellow.png)";
			case "fighting":
				return "url(/images/backgrounds/lightBlue.png)";
			case "flying":
				return "url(/images/backgrounds/purple.png)";
			case "poison":
				return "url(/images/backgrounds/purple.png)";
			case "ground":
				return "url(/images/backgrounds/green.png)";
			case "rock":
				return "url(/images/backgrounds/orange.png)";
			case "bug":
				return "url(/images/backgrounds/green.png)";
			case "ghost":
				return "url(/images/backgrounds/white.png)";
			case "steel":
				return "url(/images/backgrounds/green.png)";
			default:
				return "url(/images/backgrounds/blue.png)";
		}
	};

	return (
		<div>
			{pokemon ? (
				<div className="w-60 h-80 flex flex-col items-center space-y-4 bg-[#F9D50D] rounded-lg p-3 shadow-lg shadow-black/50">
					<div
						className="w-full h-full flex flex-col items-center justify-start px-4 py-1"
						style={{ backgroundImage: typeBgImage() }}
					>
						<div className="flex justify-between w-full items-center px-2">
							<div className="flex w-full font-odibee text-2xl capitalize">
								<h1>{pokemon.name}</h1>
							</div>
							<div className="flex w-full justify-end items-baseline">
								<span className="text-[8px] font-bold">HP</span>{" "}
								{HP?.base_stat}
							</div>
						</div>
						<div className="w-full h-5/12 justify-center items-center flex flex-col bg-gray-300 border-4 border-yellow-300 shadow-md shadow-black/50 ">
							<img
								src={
									pokemon.sprites.other.showdown.front_default
								}
								alt={pokemon.name}
							/>
						</div>
					</div>
				</div>
			) : (
				<div className="flex items-start flex-col p-3 w-60 h-80 space-y-4">
						<Skeleton className="h-4 w-full rounded-full" />
						<Skeleton className="h-5/12 w-full rounded-lg" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/5" />
                            <Skeleton className="h-4 w-4/5" />
				</div>
			)}
		</div>
	);
}
