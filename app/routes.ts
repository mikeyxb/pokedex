import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("pokemon", "routes/pokemon.tsx"), // 👈 Add this
] satisfies RouteConfig;
