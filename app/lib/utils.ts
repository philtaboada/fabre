/**
 * Formatea un número como moneda o número con separadores de miles específicos para la región.
 * Se usa para evitar errores de hidratación en Next.js asegurando el mismo formato en servidor y cliente.
 */
export const formatNumber = (amount: number, options?: Intl.NumberFormatOptions) => {
    // Siempre usamos 'es-PE' (Perú) para consistencia.
    // Perú usa '.' como separador de miles y ',' como separador decimal (tradicionalmente),
    // aunque el estándar moderno de la RAE y la norma peruana sugieren espacio para miles,
    // en la práctica inmobiliaria el formato 280.000 es el más reconocido.
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
