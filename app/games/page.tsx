"use client";

import { GameCard } from "../../components/card/game-card";
import { games } from "./_constants/games";

export default function GamesPage() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{games.map((game) => (
				<GameCard key={game.id} game={game} />
			))}
		</div>
	);
}
