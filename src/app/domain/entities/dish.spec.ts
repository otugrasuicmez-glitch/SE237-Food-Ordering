
import { describe, it, expect } from 'vitest';

import { MenuCategory } from '../enums/menu-category';
import { Unit } from '../enums/unit';
import { Money } from '../value-objects/money';
import { Quantity } from '../value-objects/quantity';
import { Recipe } from '../value-objects/recipe';
import { RecipeLine } from '../value-objects/recipe-line';

import { Dish } from './dish';
import { MenuItem } from './menu-item';

describe('Dish', () => {

    const createDish = (): Dish => {
        const recipe = new Recipe([
            new RecipeLine("MEAT", new Quantity(200, Unit.Gram)),
            new RecipeLine("OIL", new Quantity(15, Unit.Milliliter))
        ]);

        return new Dish(
            "D001",
            "Kofte",
            MenuCategory.Grill,
            new Money(25000),
            recipe
        );
    };

    it('should create a valid dish', () => {
        const dish = createDish();

        expect(dish.getCode()).toBe("D001");
        expect(dish.getName()).toBe("Kofte");
        expect(dish.getCategory()).toBe(MenuCategory.Grill);
    });

    it('should return the menu price', () => {
        const dish = createDish();

        expect(dish.price().getAmount()).toBe(25000);
    });

    it('should return required ingredients', () => {
        const dish = createDish();
        const result = dish.ingredientsNeeded();

        expect(result.get("MEAT")?.getAmount()).toBe(200);
        expect(result.get("OIL")?.getAmount()).toBe(15);
    });

    it('should inherit from MenuItem', () => {
        const dish = createDish();

        expect(dish).toBeInstanceOf(MenuItem);
    });

    it('should support polymorphism', () => {
        const item: MenuItem = createDish();

        expect(item.price().getAmount()).toBe(25000);
    });

    it('should reject an empty dish code', () => {
        expect(() => new Dish(
            "",
            "Kofte",
            MenuCategory.Grill,
            new Money(25000),
            new Recipe([])
        )).toThrow();
    });

    it('should reject an empty dish name', () => {
        expect(() => new Dish(
            "D001",
            "",
            MenuCategory.Grill,
            new Money(25000),
            new Recipe([])
        )).toThrow();
    });
});
