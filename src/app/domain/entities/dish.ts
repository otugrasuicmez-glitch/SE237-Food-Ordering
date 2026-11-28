import type { MenuCategory } from '../enums/menu-category';
import type { Money } from '../value-objects/money';
import type { Quantity } from '../value-objects/quantity';
import type { Recipe } from '../value-objects/recipe';

import { MenuItem } from './menu-item';

export class Dish extends MenuItem {
    private readonly menuPrice: Money;
    private readonly recipe: Recipe;

    constructor(
        code: string,
        name: string,
        category: MenuCategory,
        menuPrice: Money,
        recipe: Recipe
    ) {
        super(code, name, category);

        this.menuPrice = menuPrice;
        this.recipe = recipe;
    }

    override price(): Money {
        return this.menuPrice;
    }

    override ingredientsNeeded(): Map<string, Quantity> {
        return this.recipe.ingredientsNeeded();
    }
}

