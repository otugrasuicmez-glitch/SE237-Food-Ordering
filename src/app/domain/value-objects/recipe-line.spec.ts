import { describe, it, expect } from 'vitest';

import { Unit } from '../enums/unit';

import { Quantity } from './quantity';
import { RecipeLine } from './recipe-line';

describe('RecipeLine', () => {

    it('should create a valid recipe line', () => {
        const quantity = new Quantity(200, Unit.Gram);
        const line = new RecipeLine("MEAT", quantity);

        expect(line.getIngredientCode()).toBe("MEAT");
        expect(line.getQuantity()).toBe(quantity);

    });

    it('should reject empty ingredient codes', () => {
    const quantity = new Quantity(200, Unit.Gram);

    expect(() => new RecipeLine("", quantity)).toThrow();
});

    it('should reject whitespace ingredient codes', () => {
        const quantity = new Quantity(200, Unit.Gram);

        expect(() => new RecipeLine("   ", quantity)).toThrow();
    });

    it('should preserve the quantity object', () => {
        const quantity = new Quantity(250, Unit.Milliliter);
        const line = new RecipeLine("MILK", quantity);

        expect(line.getQuantity().getAmount()).toBe(250);
        expect(line.getQuantity().getUnit()).toBe(Unit.Milliliter);
    });
});