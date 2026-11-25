import type { Quantity } from './quantity';

export class RecipeLine {
    private readonly ingredientCode: string;
    private readonly quantity: Quantity;

    constructor(ingredientCode: string, quantity: Quantity) {
        if (ingredientCode.trim().length === 0) {
            throw new Error("Ingredient code cannot be empty");
        }
        this.ingredientCode = ingredientCode;
        this.quantity = quantity;
    }

    getIngredientCode(): string {
        return this.ingredientCode;
    }

    getQuantity(): Quantity {
        return this.quantity;
    }
}