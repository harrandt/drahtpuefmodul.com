export function percentageOf(partialValue: number, totalValue: number): number {
    return Math.abs(totalValue ? Math.round((100 * partialValue) / totalValue) / 100 : 0);
}
