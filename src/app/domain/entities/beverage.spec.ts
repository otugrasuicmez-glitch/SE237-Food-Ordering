
import { describe, it, expect } from 'vitest';

import { BeverageSize } from '../enums/beverage-size';
import { MenuCategory } from '../enums/menu-category';
import { Unit } from '../enums/unit';
import { Money } from '../value-objects/money';
import { Quantity } from '../value-objects/quantity';
import { Recipe } from '../value-objects/recipe';
import { RecipeLine } from '../value-objects/recipe-line';

import { Beverage } from './beverage';
import { MenuItem } from './menu-item';

describe('Beverage', () => {

    const createBeverage = (size: BeverageSize): Beverage => {
        const recipe = new Recipe([
            new RecipeLine("WATER", new Quantity(200, Unit.Milliliter)),
            new RecipeLine("SUGAR", new Quantity(30, Unit.Gram))
        ]);

        return new Beverage(
            `B001-${size}`,
            "Lemonade",
            new Money(8000),
            recipe,
            size
        );
    };

    it('should create a valid beverage', () => {
        const beverage = createBeverage(BeverageSize.Medium);

        expect(beverage.getCode()).toBe("B001-M");
        expect(beverage.getName()).toBe("Lemonade");
        expect(beverage.getCategory()).toBe(MenuCategory.Beverage);
        expect(beverage.getSize()).toBe(BeverageSize.Medium);
    });

    it('should calculate small beverage price', () => {
        const beverage = createBeverage(BeverageSize.Small);

        expect(beverage.price().getAmount()).toBe(6000);
    });

    it('should calculate medium beverage price', () => {
        const beverage = createBeverage(BeverageSize.Medium);

        expect(beverage.price().getAmount()).toBe(8000);
    });

    it('should calculate large beverage price', () => {
        const beverage = createBeverage(BeverageSize.Large);

        expect(beverage.price().getAmount()).toBe(10000);
    });

    it('should scale small beverage ingredients', () => {
        const beverage = createBeverage(BeverageSize.Small);
        const result = beverage.ingredientsNeeded();

        expect(result.get("WATER")?.getAmount()).toBe(150);
        expect(result.get("SUGAR")?.getAmount()).toBe(23);
    });

    it('should preserve medium beverage ingredients', () => {
        const beverage = createBeverage(BeverageSize.Medium);
        const result = beverage.ingredientsNeeded();

        expect(result.get("WATER")?.getAmount()).toBe(200);
        expect(result.get("SUGAR")?.getAmount()).toBe(30);
    });

    it('should scale large beverage ingredients', () => {
        const beverage = createBeverage(BeverageSize.Large);
        const result = beverage.ingredientsNeeded();

        expect(result.get("WATER")?.getAmount()).toBe(250);
        expect(result.get("SUGAR")?.getAmount()).toBe(38);
    });

    it('should round beverage price half up', () => {
        const beverage = new Beverage(
            "B002-S",
            "Tea",
            new Money(102),
            new Recipe([]),
            BeverageSize.Small
        );

        expect(beverage.price().getAmount()).toBe(77);
    });

    it('should inherit from MenuItem', () => {
        const beverage = createBeverage(BeverageSize.Medium);

        expect(beverage).toBeInstanceOf(MenuItem);
    });

    it('should support polymorphism', () => {
        const item: MenuItem = createBeverage(BeverageSize.Large);

        expect(item.price().getAmount()).toBe(10000);
    });
});
