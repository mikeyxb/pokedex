// create a navigation that goes to the homepage and to the MyPokemon page

import { Logo } from "./icons";



export default function Header() {
  return (
		<div
    className="flex flex-col justify-between items-center p-4"
    >
			{/* links to oages */}
			<Logo />
			<div
      className="flex flex-row gap-4"
      >
				<a href="/">Home</a>
				<a href="/myPokemon">My Pokemon</a>
			</div>
		</div>
  );
}