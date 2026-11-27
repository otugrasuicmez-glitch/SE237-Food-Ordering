import { InsufficientStockError } from '../errors/insufficient-stock-error';
import { UnitMismatchError } from '../errors/unit-mismatch-error';
import type { LowStockListener } from '../listeners/low-stock-listener';
import { Quantity } from '../value-objects/quantity';

import type { Ingredient } from './ingredient';

interface StockEntry {
    ingredient: Ingredient;
    stock: Quantity;
    reserved: Quantity;
}

export class Inventory {

    private readonly entries = new Map<string, StockEntry>();
    private readonly listeners = new Set<LowStockListener>();

    addIngredient(
        ingredient: Ingredient,
        initialStock: Quantity
    ): void {

        const code = ingredient.getCode();

        if (this.entries.has(code)) {
            throw new Error(`Ingredient already exists: ${code}`);
        }

        if (ingredient.getUnit() !== initialStock.getUnit()) {
            throw new UnitMismatchError(
                ingredient.getUnit(),
                initialStock.getUnit()
            );
        }

        this.entries.set(code, {
            ingredient,
            stock: initialStock,
            reserved: new Quantity(0, ingredient.getUnit())
        });
    }

    private getEntry(code: string): StockEntry {

        const entry = this.entries.get(code);

        if (!entry) {
            throw new Error(`Ingredient not found: ${code}`);
        }

        return entry;
    }

    getStock(code: string): Quantity {
        return this.getEntry(code).stock;
    }

    getReserved(code: string): Quantity {
        return this.getEntry(code).reserved;
    }

    getAvailable(code: string): Quantity {

        const entry = this.getEntry(code);

        return entry.stock.subtract(entry.reserved);
    }

    restock(code: string, quantity: Quantity): void {

        const entry = this.getEntry(code);

        entry.stock = entry.stock.add(quantity);
    }

 
reserve(code: string, quantity: Quantity): void {

    const entry = this.getEntry(code);
    const available = this.getAvailable(code);

    if (!available.isEnough(quantity)) {
        throw new InsufficientStockError(
            code,
            quantity,
            available
        );
    }

    entry.reserved = entry.reserved.add(quantity);

    this.notifyIfLowStock(code, available);
}


release(code: string, quantity: Quantity): void {

    const entry = this.getEntry(code);

    if (!entry.reserved.isEnough(quantity)) {
        throw new Error(
            `Cannot release more than reserved: ${code}`
        );
    }

    entry.reserved = entry.reserved.subtract(quantity);
}

consume(code: string, quantity: Quantity): void {

    const entry = this.getEntry(code);

    if (!entry.reserved.isEnough(quantity)) {
        throw new Error(
            `Cannot consume more than reserved: ${code}`
        );
    }

    const newStock = entry.stock.subtract(quantity);
    const newReserved = entry.reserved.subtract(quantity);

    entry.stock = newStock;
    entry.reserved = newReserved;
}


addListener(listener: LowStockListener): void {
    this.listeners.add(listener);
}

removeListener(listener: LowStockListener): void {
    this.listeners.delete(listener);
}

private notifyIfLowStock(
    code: string,
    previousAvailable: Quantity
): void {

    const entry = this.getEntry(code);
    const available = this.getAvailable(code);
    const reorderLevel = entry.ingredient.getReorderLevel();

    if (
        previousAvailable.isEnough(reorderLevel) &&
        !available.isEnough(reorderLevel)
    ) {
        for (const listener of this.listeners) {
            listener.onLowStock(
                code,
                available,
                reorderLevel
            );
        }
    }
}

}