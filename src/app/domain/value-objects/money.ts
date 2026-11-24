export class Money {
    private readonly amount: number;

    constructor(amount: number) {
        if (!Number.isSafeInteger(amount) || amount < 0) {
            throw new Error("Money must be a non-negative integer in kurus");
        }

        this.amount = amount;
    }

    getAmount(): number {
        return this.amount;

    }

    add(other: Money): Money {
        return new Money(this.amount + other.amount);
    }

    subtract(other: Money): Money {
        return new Money(this.amount - other.amount);
    }

    equals(other: Money): boolean {
        return this.amount === other.amount;
    }

    toTL(): number {
        return this.amount / 100;
    }
}