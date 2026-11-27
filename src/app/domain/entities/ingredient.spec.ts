
import { describe, it, expect } from 'vitest';

import { Unit } from '../enums/unit';
import { UnitMismatchError } from '../errors/unit-mismatch-error';
import { Quantity } from '../value-objects/quantity';

import { Ingredient } from './ingredient';

describe('Ingredient', () => {

    const reorderLevel = new Quantity(200, Unit.Gram);

    it('should store ingredient code', () => {
        const ingredient = new Ingredient(
            'MEAT', 'Ground Beef', Unit.Gram, reorderLevel
        );

        expect(ingredient.getCode()).toBe('MEAT');
    });

    it('should store ingredient name', () => {
        const ingredient = new Ingredient(
            'MEAT', 'Ground Beef', Unit.Gram, reorderLevel
        );

        expect(ingredient.getName()).toBe('Ground Beef');
    });

    it('should store ingredient unit', () => {
        const ingredient = new Ingredient(
            'MEAT', 'Ground Beef', Unit.Gram, reorderLevel
        );

        expect(ingredient.getUnit()).toBe(Unit.Gram);
    });

    it('should store reorder level', () => {
        const ingredient = new Ingredient(
            'MEAT', 'Ground Beef', Unit.Gram, reorderLevel
        );

        expect(
            ingredient.getReorderLevel().equals(reorderLevel)
        ).toBe(true);
    });

    it('should reject empty ingredient code', () => {
        expect(() => new Ingredient(
            '', 'Ground Beef', Unit.Gram, reorderLevel
        )).toThrow();
    });

    it('should reject empty ingredient name', () => {
        expect(() => new Ingredient(
            'MEAT', '', Unit.Gram, reorderLevel
        )).toThrow();
    });

    it('should reject mismatched units', () => {
        expect(() => new Ingredient(
            'MEAT', 'Ground Beef', Unit.Piece, reorderLevel
        )).toThrow(UnitMismatchError);
    });
});
