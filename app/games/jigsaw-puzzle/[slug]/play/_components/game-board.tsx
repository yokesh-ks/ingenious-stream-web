"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { usePuzzleStore } from "@/lib/stores/puzzle-store";
import Image from "next/image";
import { JigsawGenerator, NS_SVG } from "@/lib/puzzle/puzzle-generator";
import { registerDraggable, DraggingState } from "@/lib/puzzle/drag-handler";

interface GameBoardProps {
	imageUrl: string;
}

const pathIdMatcher = /^p-(\d+)-(\d+)/;

export function GameBoard({ imageUrl }: GameBoardProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const dragHandlerRef = useRef<{ isDragging: (el: SVGElement) => boolean } | null>(null);
	const [puzzleKey, setPuzzleKey] = useState(0);

	const gameStatus = usePuzzleStore((state) => state.gameStatus);
	const showPreview = usePuzzleStore((state) => state.showPreview);
	const difficulty = usePuzzleStore((state) => state.difficulty);
	const boardWidth = usePuzzleStore((state) => state.boardWidth);
	const boardHeight = usePuzzleStore((state) => state.boardHeight);
	const setBoardDimensions = usePuzzleStore((state) => state.setBoardDimensions);
	const completeGame = usePuzzleStore((state) => state.completeGame);

	const gridSize = Math.sqrt(difficulty);

	// Set board dimensions on mount
	useEffect(() => {
		const updateSize = () => {
			if (containerRef.current) {
				const container = containerRef.current;
				const availableWidth = container.clientWidth - 100;
				const availableHeight = container.clientHeight - 100;
				const size = Math.min(availableWidth, availableHeight, 500);
				setBoardDimensions(size, size);
			}
		};
		updateSize();
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, [setBoardDimensions]);

	// Reset puzzle when game starts
	useEffect(() => {
		if (gameStatus === "playing") {
			setPuzzleKey((k) => k + 1);
		}
	}, [gameStatus]);

	// Initialize and run puzzle
	useEffect(() => {
		if (!svgRef.current || boardWidth === 0 || gameStatus !== "playing") return;

		const svg = svgRef.current;

		// Clear everything
		svg.innerHTML = "";

		// Calculate sizes
		const unitSize = gridSize * 100;
		const width = unitSize;
		const height = unitSize;
		const viewWidth = Math.max(640, width * 1.5);
		const viewHeight = Math.max(480, height * 1.5);
		const threshold = Math.max(
			3,
			Math.sqrt((width / gridSize) ** 2 + (height / gridSize) ** 2) / 20,
		);

		svg.setAttribute("viewBox", `0 0 ${viewWidth} ${viewHeight}`);

		// Create defs
		const defs = document.createElementNS(NS_SVG, "defs");
		svg.appendChild(defs);

		// Create image in defs (only used as reference for masks, not rendered directly)
		const imageEl = document.createElementNS(NS_SVG, "image");
		imageEl.id = "puzzle-img";
		imageEl.setAttribute("href", imageUrl);
		imageEl.setAttribute("width", width.toString());
		imageEl.setAttribute("height", height.toString());
		imageEl.setAttribute("preserveAspectRatio", "xMidYMid slice");
		defs.appendChild(imageEl);

		// Create masks group
		const masksGroup = document.createElementNS(NS_SVG, "g");
		masksGroup.id = "ms";
		svg.appendChild(masksGroup);

		// Create instances group
		const instanceGroup = document.createElementNS(NS_SVG, "g");
		instanceGroup.id = "ins";
		svg.appendChild(instanceGroup);

		// Generate puzzle
		const generator = new JigsawGenerator({
			width,
			height,
			xCount: gridSize,
			yCount: gridSize,
			radius: Math.min(width / gridSize, height / gridSize) / 5,
			seed: Date.now(),
		});

		const paths = generator.toSvgElements(document, defs);

		// Create masks and draggable instances
		for (const path of paths) {
			// Create mask
			const mask = document.createElementNS(NS_SVG, "mask");
			mask.id = `${path.id}-m`;
			const maskPath = document.createElementNS(NS_SVG, "use");
			maskPath.setAttribute("href", `#${path.id}`);
			mask.appendChild(maskPath);
			masksGroup.appendChild(mask);

			// Create draggable instance
			const instance = document.createElementNS(NS_SVG, "g");
			instance.id = `${path.id}-i`;
			instance.classList.add("draggable");

			// Image with mask (no pointer events - only for display)
			const base = document.createElementNS(NS_SVG, "use");
			base.setAttribute("href", "#puzzle-img");
			base.setAttribute("mask", `url(#${mask.id})`);
			base.setAttribute("pointer-events", "none");
			instance.appendChild(base);

			// Overlay for interaction and styling (captures all pointer events)
			const decoPath = document.createElementNS(NS_SVG, "use");
			decoPath.classList.add("handler", "pzoverlay");
			decoPath.setAttribute("href", `#${path.id}`);
			decoPath.setAttribute("pointer-events", "all");
			instance.appendChild(decoPath);

			// Set random initial position
			const m = pathIdMatcher.exec(path.id);
			if (m) {
				const pieceW = width / gridSize;
				const pieceH = height / gridSize;
				const col = parseInt(m[1], 10);
				const row = parseInt(m[2], 10);

				const transform = svg.createSVGTransform();
				transform.setTranslate(
					Math.round(Math.random() * (viewWidth - pieceW) - col * pieceW),
					Math.round(Math.random() * (viewHeight - pieceH) - row * pieceH),
				);
				instance.transform.baseVal.appendItem(transform);
			}

			instanceGroup.appendChild(instance);
		}

		// Check and merge function
		const checkAndMerge = (
			current: SVGGraphicsElement,
			nextSelector: string,
		): SVGGraphicsElement => {
			const other = instanceGroup
				.querySelector(nextSelector)
				?.closest<SVGGraphicsElement>(".draggable");
			if (!other || other === current) return current;
			if (dragHandlerRef.current?.isDragging(other)) return current;

			const t1 = current.transform.baseVal;
			if (!t1.numberOfItems) return current;
			const t2 = other.transform.baseVal;
			if (!t2.numberOfItems) return current;

			const m1 = t1.getItem(0).matrix;
			const m2 = t2.getItem(0).matrix;
			if (Math.sqrt((m1.e - m2.e) ** 2 + (m1.f - m2.f) ** 2) > threshold) return current;

			const currentIsGroup = current.classList.contains("group");
			const otherIsGroup = other.classList.contains("group");

			if (currentIsGroup) {
				if (!otherIsGroup) {
					other.classList.remove("draggable");
					t2.removeItem(0);
					current.appendChild(other);
				} else if (other.childElementCount > current.childElementCount) {
					transferChildren(current, other);
					current.remove();
					return other;
				} else {
					transferChildren(other, current);
					other.remove();
				}
				return current;
			}

			if (otherIsGroup) {
				current.classList.remove("draggable");
				t1.removeItem(0);
				other.appendChild(current);
				return other;
			}

			// Create new group
			const newGroup = document.createElementNS(NS_SVG, "g");
			newGroup.classList.add("draggable", "group");
			instanceGroup.appendChild(newGroup);

			newGroup.appendChild(current);
			current.classList.remove("draggable");
			newGroup.appendChild(other);
			other.classList.remove("draggable");

			const t = t2.getItem(0);
			t1.removeItem(0);
			t2.removeItem(0);
			newGroup.transform.baseVal.appendItem(t);

			return newGroup;
		};

		// Drag handlers
		const onDrag = (element: SVGElement) => {
			element.classList.add("grabbing");
		};

		const onDrop = (state: DraggingState) => {
			state.element.classList.remove("grabbing");

			const { id } = state.target.parentNode as Element;
			const m = pathIdMatcher.exec(id);
			if (!m) return;

			const x = parseInt(m[1], 10);
			const y = parseInt(m[2], 10);

			// Check adjacent pieces
			state.element = checkAndMerge(state.element, `#p-${x + 1}-${y}-i`);
			state.element = checkAndMerge(state.element, `#p-${x - 1}-${y}-i`);
			state.element = checkAndMerge(state.element, `#p-${x}-${y + 1}-i`);
			state.element = checkAndMerge(state.element, `#p-${x}-${y - 1}-i`);

			// Check completion
			if (instanceGroup.childElementCount <= 1) {
				const lastElement = instanceGroup.querySelector<SVGGraphicsElement>(".draggable.group");
				if (lastElement) {
					lastElement.classList.remove("draggable");
					if (lastElement.transform.baseVal.numberOfItems) {
						lastElement.transform.baseVal.removeItem(0);
					}
				}
				completeGame();
			}
		};

		// Register drag handler
		dragHandlerRef.current = registerDraggable(svg, onDrag, onDrop);
	}, [puzzleKey, boardWidth, gameStatus, gridSize, imageUrl, completeGame]);

	const isPaused = gameStatus === "paused";

	return (
		<div
			ref={containerRef}
			className="relative w-full h-full flex items-center justify-center overflow-hidden"
		>
			{isPaused && (
				<div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
					<div className="text-center">
						<div className="text-4xl font-bold text-white mb-2">PAUSED</div>
						<p className="text-white/70">Click Resume to continue</p>
					</div>
				</div>
			)}

			<svg
				ref={svgRef}
				className="w-full h-full max-w-full max-h-full"
				style={{ touchAction: "none" }}
				viewBox="0 0 640 480"
			/>

			{showPreview && (
				<div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center bg-black/30">
					<div
						className="rounded-xl overflow-hidden shadow-2xl ring-4 ring-purple-500 animate-pulse"
						style={{ width: Math.min(boardWidth, 400), height: Math.min(boardHeight, 400) }}
					>
						<Image src={imageUrl} alt="Preview" fill className="object-cover" unoptimized />
					</div>
				</div>
			)}

			<style jsx global>{`
        .draggable {
          cursor: grab;
        }
        .draggable:hover {
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }
        .draggable.grabbing {
          cursor: grabbing;
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
        }
        .pzoverlay {
          fill: transparent;
          stroke: rgba(0, 0, 0, 0.2);
          stroke-width: 1;
        }
        .draggable:hover .pzoverlay {
          stroke: rgba(0, 0, 0, 0.4);
        }
        #ms mask use {
          fill: white;
        }
      `}</style>
		</div>
	);
}

function transferChildren(src: Element, dest: Element) {
	if (!src.childElementCount) return;
	const frag = src.ownerDocument.createDocumentFragment();
	Array.from(src.childNodes).forEach((node) => frag.appendChild(node));
	dest.appendChild(frag);
}
