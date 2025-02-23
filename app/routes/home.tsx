import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import PokemonList from "~/Components/PokemonList";

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
    <>
      {/* <Welcome message={loaderData.message} /> */}
      <PokemonList />
    </>
  );
}
