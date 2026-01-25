import { ReactNode } from "react";

export default function QuizSlugLayout({ children }: { children: ReactNode }) {
	return (
		<div className="relative min-h-screen overflow-hidden bg-black">
			{/* Cinema curtains - left */}
			<div className="absolute left-0 top-0 h-full w-16 md:w-24 lg:w-32 bg-gradient-to-r from-red-950 via-red-900 to-transparent z-[1] pointer-events-none">
				<div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_20px,rgba(0,0,0,0.3)_20px,rgba(0,0,0,0.3)_40px)]" />
			</div>

			{/* Cinema curtains - right */}
			<div className="absolute right-0 top-0 h-full w-16 md:w-24 lg:w-32 bg-gradient-to-l from-red-950 via-red-900 to-transparent z-[1] pointer-events-none">
				<div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_20px,rgba(0,0,0,0.3)_20px,rgba(0,0,0,0.3)_40px)]" />
			</div>

			{/* Top curtain valance */}
			<div className="absolute top-0 left-0 right-0 h-8 md:h-12 bg-gradient-to-b from-red-950 via-red-900 to-transparent z-[1] pointer-events-none">
				<div className="absolute bottom-0 left-0 right-0 h-4 bg-[radial-gradient(ellipse_at_bottom,rgba(139,0,0,0.8)_0%,transparent_70%)]" />
			</div>

			{/* Projector light beam effect */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full bg-[conic-gradient(from_180deg_at_50%_0%,transparent_40%,rgba(255,255,200,0.03)_45%,rgba(255,255,200,0.05)_50%,rgba(255,255,200,0.03)_55%,transparent_60%)]" />
			</div>

			{/* Ambient cinema glow */}
			<div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black pointer-events-none z-0" />

			{/* Subtle dust particles effect */}
			<div className="absolute inset-0 opacity-30 pointer-events-none z-0">
				<div className="absolute w-1 h-1 bg-yellow-100/20 rounded-full animate-pulse top-[20%] left-[30%]" />
				<div className="absolute w-0.5 h-0.5 bg-yellow-100/30 rounded-full animate-pulse top-[40%] left-[60%] animation-delay-1000" />
				<div className="absolute w-1 h-1 bg-yellow-100/20 rounded-full animate-pulse top-[60%] left-[25%] animation-delay-2000" />
				<div className="absolute w-0.5 h-0.5 bg-yellow-100/30 rounded-full animate-pulse top-[30%] left-[70%] animation-delay-500" />
				<div className="absolute w-1 h-1 bg-yellow-100/20 rounded-full animate-pulse top-[70%] left-[80%] animation-delay-1500" />
			</div>

			{/* Cinema floor gradient (seats silhouette hint) */}
			<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent pointer-events-none z-0" />

			{/* Main content */}
			<div className="relative z-[2]">{children}</div>
		</div>
	);
}
