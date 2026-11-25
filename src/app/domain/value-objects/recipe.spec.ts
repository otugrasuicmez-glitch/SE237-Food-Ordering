
import { describe, it, expect } from 'vitest';

import { Unit } from '../enums/unit';
import { UnitMismatchError } from '../errors/unit-mismatch-error';

import { Quantity } from './quantity';
import { Recipe } from './recipe';
import { RecipeLine } from './recipe-line';

describe('Recipe', () => {

    it('should create a recipe with multiple lines', () => {
        const recipe = new Recipe([
            new RecipeLine("MEAT", new Quantity(200, Unit.Gram)),
            new RecipeLine("OIL", new Quantity(15, Unit.Milliliter))
        ]);

        expect(recipe.getLines().length).toBe(2);
    });

    it('should calculate required ingredients', () => {
        const recipe = new Recipe([
            new RecipeLine("MEAT", new Quantity(200, Unit.Gram)),
            new RecipeLine("OIL", new Quantity(15, Unit.Milliliter))
        ]);

        const result = recipe.ingredientsNeeded();

        expect(result.get("MEAT")?.getAmount()).toBe(200);
        expect(result.get("OIL")?.getAmount()).toBe(15);
    });

    it('should combine duplicate ingredients', () => {
        const recipe = new Recipe([
            new RecipeLine("FLOUR", new Quantity(200, Unit.Gram)),
            new RecipeLine("FLOUR", new Quantity(50, Unit.Gram))
        ]);

        const result = recipe.ingredientsNeeded();

        expect(result.size).toBe(1);
        expect(result.get("FLOUR")?.getAmount()).toBe(250);
    });

    it('should reject incompatible units for the same ingredient', () => {
        const recipe = new Recipe([
            new RecipeLine("MILK", new Quantity(200, Unit.Milliliter)),
            new RecipeLine("MILK", new Quantity(50, Unit.Gram))
        ]);

        expect(() => recipe.ingredientsNeeded())
            .toThrow(UnitMismatchError);
    });

    it('should protect recipe from external array changes', () => {
        const lines = [
            new RecipeLine("MEAT", new Quantity(200, Unit.Gram))
        ];

        const recipe = new Recipe(lines);

        lines.push(
            new RecipeLine("OIL", new Quantity(15, Unit.Milliliter))
        );

        expect(recipe.getLines().length).toBe(1);
    });

    it('should return an empty map for an empty recipe', () => {
        const recipe = new Recipe([]);

        expect(recipe.ingredientsNeeded().size).toBe(0);
    });

    it('should not modify original ingredient quantities', () => {
        const first = new RecipeLine(
            "FLOUR", new Quantity(200, Unit.Gram)
        );

        const second = new RecipeLine(
            "FLOUR", new Quantity(50, Unit.Gram)
        );

        const recipe = new Recipe([first, second]);

        recipe.ingredientsNeeded();

        expect(first.getQuantity().getAmount()).toBe(200);
        expect(second.getQuantity().getAmount()).toBe(50);
    });

    it('should scale recipe ingredients', () => {
    const recipe = new Recipe([
        new RecipeLine("MILK", new Quantity(200, Unit.Milliliter))
    ]);

    const result = recipe.ingredientsNeeded(1.25);

    expect(result.get("MILK")?.getAmount()).toBe(250);
});

it('should combine ingredients before rounding', () => {
    const recipe = new Recipe([
        new RecipeLine("FLOUR", new Quantity(2, Unit.Gram)),
        new RecipeLine("FLOUR", new Quantity(2, Unit.Gram))
    ]);

    const result = recipe.ingredientsNeeded(0.75);

    expect(result.get("FLOUR")?.getAmount()).toBe(3);
});

it('should reject negative scaling factors', () => {
    const recipe = new Recipe([]);

    expect(() => recipe.ingredientsNeeded(-1)).toThrow();
});
});
