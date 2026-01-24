"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play, Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const difficultyOptions = [
	{ value: "9", label: "Easy", grid: "3×3" },
	{ value: "16", label: "Medium", grid: "4×4" },
	{ value: "25", label: "Hard", grid: "5×5" },
	{ value: "36", label: "Expert", grid: "6×6" },
	{ value: "49", label: "Master", grid: "7×7" },
	{ value: "81", label: "Legendary", grid: "9×9" },
];

interface DifficultySelectorProps {
	slug: string;
}

export function DifficultySelector({ slug }: DifficultySelectorProps) {
	const [selectedDifficulty, setSelectedDifficulty] = useState("9");
	const router = useRouter();

	const selectedOption = difficultyOptions.find((opt) => opt.value === selectedDifficulty);

	const handleStartPuzzle = () => {
		router.push(`/games/jigsaw-puzzle/${slug}/play?difficulty=${selectedDifficulty}`);
	};

	return (
		<div className="space-y-6">
			<div className="space-y-3">
				<h3 className="text-lg font-semibold text-foreground">Choose Difficulty</h3>
				<RadioGroup
					value={selectedDifficulty}
					onValueChange={setSelectedDifficulty}
					className="grid grid-cols-2 sm:grid-cols-3 gap-3"
				>
					{difficultyOptions.map((option) => (
						<label key={option.value} className="cursor-pointer">
							<RadioGroupItem value={option.value} className="sr-only" />
							<Card
								className={`relative p-4 py-4 gap-0 transition-all duration-200 ${
									selectedDifficulty === option.value
										? "border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/20"
										: "hover:border-purple-500/50"
								}`}
							>
								{selectedDifficulty === option.value && (
									<div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
										<Check className="w-3 h-3 text-white" />
									</div>
								)}
								<div className="text-center">
									<div className="text-lg font-bold text-foreground">{option.grid}</div>
									<div className="text-sm text-muted-foreground">{option.label}</div>
									<div className="text-xs text-muted-foreground mt-1">{option.value} pieces</div>
								</div>
							</Card>
						</label>
					))}
				</RadioGroup>
			</div>

			<Button
				onClick={handleStartPuzzle}
				size="lg"
				className="w-full sm:w-auto gap-3 px-8 py-6 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white text-lg font-bold rounded-2xl hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
			>
				<Play className="w-5 h-5" />
				Start Puzzle ({selectedOption?.label})
			</Button>
		</div>
	);
}
