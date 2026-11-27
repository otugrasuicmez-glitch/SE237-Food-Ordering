import type { Quantity } from '../value-objects/quantity';

export interface LowStockListener {

    onLowStock(
        ingredientCode: string,
        available: Quantity,
        reorderLevel: Quantity
    ): void;
    
}