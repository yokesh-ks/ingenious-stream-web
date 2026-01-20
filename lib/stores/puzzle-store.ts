import { create } from "zustand";

export type Difficulty = 9 | 16 | 25 | 36 | 49 | 81;

export interface PuzzleState {
	// Game state
	gameStatus: "idle" | "selecting" | "playing" | "paused" | "completed";
	imageUrl: string | null;
	difficulty: Difficulty;

	// Timer
	startTime: number | null;
	elapsedTime: number;
	timerInterval: NodeJS.Timeout | null;

	// Settings
	showPreview: boolean;

	// Board dimensions
	boardWidth: number;
	boardHeight: number;

	// Actions
	setImage: (url: string) => void;
	setDifficulty: (difficulty: Difficulty) => void;
	startGame: () => void;
	pauseGame: () => void;
	resumeGame: () => void;
	restartGame: () => void;
	resetGame: () => void;
	completeGame: () => void;

	// UI toggles
	togglePreview: () => void;

	// Timer actions
	updateElapsedTime: () => void;
	stopTimer: () => void;

	// Board setup
	setBoardDimensions: (width: number, height: number) => void;
}

export const usePuzzleStore = create<PuzzleState>((set, get) => ({
	// Initial state
	gameStatus: "idle",
	imageUrl: null,
	difficulty: 16,

	startTime: null,
	elapsedTime: 0,
	timerInterval: null,

	showPreview: false,

	boardWidth: 400,
	boardHeight: 400,

	// Actions
	setImage: (url) => set({ imageUrl: url, gameStatus: "selecting" }),

	setDifficulty: (difficulty) => set({ difficulty }),

	startGame: () => {
		const state = get();
		if (!state.imageUrl) return;

		set({
			gameStatus: "playing",
			elapsedTime: 0,
			startTime: Date.now(),
		});

		// Start timer
		const interval = setInterval(() => get().updateElapsedTime(), 1000);
		set({ timerInterval: interval });
	},

	pauseGame: () => {
		const state = get();
		if (state.timerInterval) {
			clearInterval(state.timerInterval);
		}
		set({ gameStatus: "paused", timerInterval: null });
	},

	resumeGame: () => {
		const state = get();
		const interval = setInterval(() => get().updateElapsedTime(), 1000);
		set({
			gameStatus: "playing",
			timerInterval: interval,
			startTime: Date.now() - state.elapsedTime * 1000,
		});
	},

	restartGame: () => {
		const state = get();
		if (state.timerInterval) {
			clearInterval(state.timerInterval);
		}
		get().startGame();
	},

	resetGame: () => {
		const state = get();
		if (state.timerInterval) {
			clearInterval(state.timerInterval);
		}
		set({
			gameStatus: "idle",
			imageUrl: null,
			elapsedTime: 0,
			startTime: null,
			timerInterval: null,
			showPreview: false,
		});
	},

	completeGame: () => {
		const state = get();
		if (state.timerInterval) {
			clearInterval(state.timerInterval);
		}
		set({
			gameStatus: "completed",
			timerInterval: null,
		});
	},

	togglePreview: () => set((state) => ({ showPreview: !state.showPreview })),

	updateElapsedTime: () => {
		const state = get();
		if (state.startTime) {
			set({ elapsedTime: Math.floor((Date.now() - state.startTime) / 1000) });
		}
	},

	stopTimer: () => {
		const state = get();
		if (state.timerInterval) {
			clearInterval(state.timerInterval);
			set({ timerInterval: null });
		}
	},

	setBoardDimensions: (width, height) => set({ boardWidth: width, boardHeight: height }),
}));
