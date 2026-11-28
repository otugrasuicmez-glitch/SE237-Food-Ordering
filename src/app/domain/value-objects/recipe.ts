import type { Quantity } from './quantity';
import type { RecipeLine } from './recipe-line';

export class Recipe {
    private readonly lines: readonly RecipeLine[];

    constructor(lines: readonly RecipeLine[]) {
        this.lines = [...lines];
    }

    getLines(): readonly RecipeLine[] {
        return [...this.lines];
    }

ingredientsNeeded(factor: number = 1): Map<string, Quantity> {
    if (!Number.isFinite(factor) || factor < 0) {
        throw new Error("Invalid multiplication factor");
    }

    const result = new Map<string, Quantity>();

    for (const line of this.lines) {
        const code = line.getIngredientCode();
        const quantity = line.getQuantity();

        const existing = result.get(code);

        if (existing) {
            result.set(code, existing.add(quantity));
        } else {
            result.set(code, quantity);
        }
    }

    for (const [code, quantity] of result) {
        result.set(code, quantity.multiply(factor));
    }

    return result;
}
}