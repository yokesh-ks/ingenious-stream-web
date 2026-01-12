import { ChevronRight, ChevronLeft, type LucideIcon } from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
	chevronRight: ChevronRight,
	chevronLeft: ChevronLeft,
} as const;
