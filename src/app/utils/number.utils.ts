export function roundDecimal(value: number, decimalPlaces: number): number {
    return parseFloat(value.toFixed(decimalPlaces));
}