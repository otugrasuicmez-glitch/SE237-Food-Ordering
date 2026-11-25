import { MenuCategory } from '../enums/menu-category';
import { Money } from '../value-objects/money';
import type { Quantity } from '../value-objects/quantity';

import { MenuItem } from './menu-item';

export class ComboMenu extends MenuItem {
    private readonly items: readonly MenuItem[];

    constructor(
        code: string,
        name: string,
        items: readonly MenuItem[]
    ) {
        super(code, name, MenuCategory.Combo);

        if (items.length < 2) {
            throw new Error("Combo menu must contain at least two items");
        }
        this.items = [...items];
    }

    getItems(): readonly MenuItem[] {
        return [...this.items];
    }

    override price(): Money {
        let total = new Money(0);

        for (const item of this.items) {
            total = total.add(item.price());
        }

        return new Money(
    Number((BigInt(total.getAmount()) * 85n + 50n) / 100n)
);
    }
override ingredientsNeeded(): Map<string, Quantity> {
    const result = new Map<string, Quantity>();

    for (const item of this.items) {
        for (const [code, quantity] of item.ingredientsNeeded()) {
            const existing = result.get(code);

            if (existing) {
                result.set(code, existing.add(quantity));
            } else {
                result.set(code, quantity);
            }
        }
    }

    return result;
  }
}