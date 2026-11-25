
import { BeverageSize } from '../enums/beverage-size';
import { MenuCategory } from '../enums/menu-category';
import type { Money } from '../value-objects/money';
import type { Quantity } from '../value-objects/quantity';
import type { Recipe } from '../value-objects/recipe';

import { MenuItem } from './menu-item';

export class Beverage extends MenuItem {
    private readonly basePrice: Money;
    private readonly recipe: Recipe;
    private readonly size: BeverageSize;

    constructor(
        code: string,
        name: string,
        basePrice: Money,
        recipe: Recipe,
        size: BeverageSize
    ) {
        super(code, name, MenuCategory.Beverage);

        this.basePrice = basePrice;
        this.recipe = recipe;
        this.size = size;
    }

    getSize(): BeverageSize {
        return this.size;
    }

    private getSizeFactor(): number {
        switch (this.size) {
            case BeverageSize.Small:
                return 0.75;
            case BeverageSize.Medium:
                return 1;
            case BeverageSize.Large:
                return 1.25;
            default:
                throw new Error("Invalid beverage size");
        }
    }

    override price(): Money {
        return this.basePrice.multiply(this.getSizeFactor());
    }

    override ingredientsNeeded(): Map<string, Quantity> {
        return this.recipe.ingredientsNeeded(this.getSizeFactor());
    }
    

}