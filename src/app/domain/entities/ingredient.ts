
import type { Unit } from '../enums/unit';
import { UnitMismatchError } from '../errors/unit-mismatch-error';
import type { Quantity } from '../value-objects/quantity';

export class Ingredient {

    private readonly code: string;
    private readonly name: string;
    private readonly unit: Unit;
    private readonly reorderLevel: Quantity;

    constructor(
        code: string,
        name: string,
        unit: Unit,
        reorderLevel: Quantity
    ) {
        if (code.trim().length === 0) {
            throw new Error("Ingredient code cannot be empty");
        }

        if (name.trim().length === 0) {
            throw new Error("Ingredient name cannot be empty");
        }

        if (unit !== reorderLevel.getUnit()) {
            throw new UnitMismatchError(
                unit,
                reorderLevel.getUnit()
            );
        }

        this.code = code;
        this.name = name;
        this.unit = unit;
        this.reorderLevel = reorderLevel;
    }

    getCode(): string {
        return this.code;
    }

    getName(): string {
        return this.name;
    }

    getUnit(): Unit {
        return this.unit;
    }

    getReorderLevel(): Quantity {
        return this.reorderLevel;
    }
}
