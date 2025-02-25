import { getPokemonById } from "~/API/getPokemon";
import Header from "~/Components/Header";
import PokemonDetail from "~/Components/PokemonDetail";

// remix action function to fetch the pokemon data
export async function action({ request }: { request: Request }) {
	const formData = await request.formData();
	const id = formData.get("id");
	const action = formData.get("_action");
    console.log("action : ",action)
	if (action === "getPokemonById") {
		const data = await getPokemonById(Number(id));
        // console.log("data : ",data)
		return data;
	}

	return new Response("Invalid action", { status: 400 });
}

// list of pokemon IDs
const PokemonIds = [1, 2, 3, 4, 5, 10, 55, 66, 77, 88, 99, 100];

export default function MyPokemon() {
	return (
		<div
		className="container mx-auto p-4 flex flex-col items-center"
		>
			<Header />
			a list of my pokemon
			<div
			className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
				{/* map over the pokemon IDs and add them to the component as a prop */}
				{PokemonIds.map((id: number, index) => {
					return <PokemonDetail id={id} key={index} />;
				})}
			</div>
		</div>
	);
}
