import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function splitName(name: string) {
	const [firstName, ...lastNameParts] = name.split(" ");
	const lastName = lastNameParts.join(" ");
	return { firstName, lastName };
}
