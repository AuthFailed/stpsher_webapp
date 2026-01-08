import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type WithElementRef<T extends Record<string, any>> = T & {
	ref?: HTMLElement | null | undefined;
};

export type WithoutChildrenOrChild<T extends { children?: any; child?: any }> = Omit<
	T,
	'children' | 'child'
>;
