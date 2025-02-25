import { PokemonClient, type NamedAPIResourceList } from 'pokenode-ts';

export function getPokemonById(id: number) {
  const api = new PokemonClient();
  try {
    return api.getPokemonById(id);
  } catch (error) {
    return { error: "Failed to load Pokémon", status: 500 };
  }
}