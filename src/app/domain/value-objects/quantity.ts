
import type { Unit } from '../enums/unit';
import { UnitMismatchError } from '../errors/unit-mismatch-error';

export class Quantity {
    private readonly amount: number;
    private readonly unit: Unit;

    constructor(amount: number, unit: Unit) {
        if (!Number.isSafeInteger(amount) || amount < 0) {
            throw new Error("Quantity must be a non-negative integer");
        }

        this.amount = amount;
        this.unit = unit;
    }

    getAmount(): number {
        return this.amount;
    }

    getUnit(): Unit {
        return this.unit;
    }

    private ensureSameUnit(other: Quantity): void {
        if (this.unit !== other.unit) {
            throw new UnitMismatchError(this.unit, other.unit);
        }
    }

    add(other: Quantity): Quantity {
        this.ensureSameUnit(other);
        return new Quantity(this.amount + other.amount, this.unit);
    }

    subtract(other: Quantity): Quantity {
        this.ensureSameUnit(other);
        return new Quantity(this.amount - other.amount, this.unit);
    }

    equals(other: Quantity): boolean {
        return this.amount === other.amount && this.unit === other.unit;
    }

    isEnough(other: Quantity): boolean {
        this.ensureSameUnit(other);
        return this.amount >= other.amount;
    }
}
