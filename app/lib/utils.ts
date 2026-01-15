import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatNumber = (amount: number, options?: Intl.NumberFormatOptions) => {
    return amount.toLocaleString('es-PE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        ...options
    });
};

export const formatCurrency = (amount: number) => {
    return `$ ${formatNumber(amount)}`;
};

export const formatSoles = (amount: number) => {
    return `S/ ${formatNumber(amount)}`;
};
