import type { MenuCategory } from '../enums/menu-category';
import type { Money } from '../value-objects/money';
import type { Quantity } from '../value-objects/quantity';

export abstract class MenuItem {
    private readonly code: string;
    private readonly name: string;
    private readonly category: MenuCategory;

    protected constructor(
        code: string,
        name: string,
        category: MenuCategory
    ) {
        if (code.trim().length === 0) {
            throw new Error("Menu item code cannot be empty");
        }

        if (name.trim().length === 0) {
            throw new Error("Menu item name cannot be empty");
        }

        this.code = code;
        this.name = name;
        this.category = category;
    }

    getCode(): string {
        return this.code;
    }

    getName(): string {
        return this.name;
    }

       getCategory(): MenuCategory {
        return this.category;
    }

    abstract price(): Money;

    abstract ingredientsNeeded(): Map<string, Quantity>;
}