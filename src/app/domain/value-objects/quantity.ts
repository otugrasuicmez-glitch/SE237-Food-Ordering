export class Quantity {
    private readonly amount: number;

    constructor(amount: number) {
        if (!Number.isFinite(amount) || amount < 0) {
            throw new Error("Quantity must be a non-negative finite number");
        }

        this.amount = amount;
    }

    getAmount(): number {
        return this.amount;
    }

    add(other: Quantity): Quantity {
        return new Quantity(this.amount + other.amount);
    }

    subtract(other: Quantity): Quantity {
        return new Quantity(this.amount - other.amount);
    }

    equals(other: Quantity): boolean {
        return this.amount === other.amount;
    }

    isEnough(other: Quantity): boolean {
        return this.amount >= other.amount;
    }
}