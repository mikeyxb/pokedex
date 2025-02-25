// create a navigation that goes to the homepage and to the MyPokemon page

export default function Header() {
  return (
    <div>
      {/* links to oages */}
        <a href="/">Home</a>
        <a href="/myPokemon">My Pokemon</a>
    </div>
  );
}