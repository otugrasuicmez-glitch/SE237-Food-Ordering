
import { describe, it, expect } from 'vitest';

import { BeverageSize } from '../enums/beverage-size';
import { MenuCategory } from '../enums/menu-category';
import { Unit } from '../enums/unit';
import { Money } from '../value-objects/money';
import { Quantity } from '../value-objects/quantity';
import { Recipe } from '../value-objects/recipe';
import { RecipeLine } from '../value-objects/recipe-line';

import { Beverage } from './beverage';
import { ComboMenu } from './combo-menu';
import { Dish } from './dish';
import { MenuItem } from './menu-item';

describe('ComboMenu', () => {

    const createDish = (): Dish => {
        return new Dish(
            "D001",
            "Kofte",
            MenuCategory.Grill,
            new Money(25000),
            new Recipe([
                new RecipeLine("MEAT", new Quantity(200, Unit.Gram)),
                new RecipeLine("WATER", new Quantity(50, Unit.Milliliter))
            ])
        );
    };

    const createBeverage = (): Beverage => {
        return new Beverage(
            "B001-M",
            "Lemonade",
            new Money(8000),
            new Recipe([
                new RecipeLine("WATER", new Quantity(200, Unit.Milliliter)),
                new RecipeLine("SUGAR", new Quantity(30, Unit.Gram))
            ]),
            BeverageSize.Medium
        );
    };

    const createCombo = (): ComboMenu => {
        return new ComboMenu(
            "C001",
            "Kofte Menu",
            [createDish(), createBeverage()]
        );
    };

    it('should create a valid combo menu', () => {
        const combo = createCombo();

        expect(combo.getCode()).toBe("C001");
        expect(combo.getName()).toBe("Kofte Menu");
        expect(combo.getCategory()).toBe(MenuCategory.Combo);
        expect(combo.getItems().length).toBe(2);
    });

    it('should reject an empty combo menu', () => {
        expect(() => new ComboMenu("C001", "Menu", [])).toThrow();
    });

    it('should reject a combo with only one item', () => {
        expect(() => new ComboMenu(
            "C001",
            "Menu",
            [createDish()]
        )).toThrow();
    });

    it('should apply a 15 percent discount', () => {
        const combo = createCombo();

        expect(combo.price().getAmount()).toBe(28050);
    });

    it('should aggregate shared ingredients', () => {
        const result = createCombo().ingredientsNeeded();

        expect(result.get("WATER")?.getAmount()).toBe(250);
    });

    it('should include all required ingredients', () => {
        const result = createCombo().ingredientsNeeded();

        expect(result.size).toBe(3);
        expect(result.get("MEAT")?.getAmount()).toBe(200);
        expect(result.get("SUGAR")?.getAmount()).toBe(30);
    });

    it('should round combo price half up', () => {
        const first = new Dish(
            "D002", "Dish 1", MenuCategory.Grill,
            new Money(5), new Recipe([])
        );

        const second = new Dish(
            "D003", "Dish 2", MenuCategory.Grill,
            new Money(5), new Recipe([])
        );

        const combo = new ComboMenu(
            "C002", "Test Menu", [first, second]
        );

        expect(combo.price().getAmount()).toBe(9);
    });

    it('should inherit from MenuItem', () => {
        expect(createCombo()).toBeInstanceOf(MenuItem);
    });

    it('should support polymorphism', () => {
        const item: MenuItem = createCombo();

        expect(item.price().getAmount()).toBe(28050);
    });

    it('should protect its internal items array', () => {
        const items: MenuItem[] = [
            createDish(),
            createBeverage()
        ];

        const combo = new ComboMenu("C001", "Menu", items);

        items.pop();

        expect(combo.getItems().length).toBe(2);
    });
});
