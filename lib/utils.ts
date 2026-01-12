import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function filterDiscoverParams(searchParams?: Record<string, string>) {
	if (!searchParams) return {};

	const filtered: Record<string, string> = {};

	// Filter out undefined, null, and empty string values
	Object.entries(searchParams).forEach(([key, value]) => {
		if (value && value !== "undefined" && value !== "null") {
			filtered[key] = value;
		}
	});

	return filtered;
}

export function formatValue(value: any, formatter?: (value: any) => any): any {
	if (formatter) {
		return formatter(value);
	}
	return value;
}

export function joiner<T>(items: T[], key: keyof T): string {
	if (!items || items.length === 0) return "";
	return items.map((item) => item[key]).join(", ");
}
