import type { Route } from "./+types/home";
import PokemonList from "~/Components/PokemonList";
import Header from "~/Components/Header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Hello from Vercel" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div
    className="w-full"
    >
      {/* <Welcome message={loaderData.message} /> */}
      <PokemonList />
    </div>
  );
}
