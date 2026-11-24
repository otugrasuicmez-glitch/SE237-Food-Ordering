

import { describe, it, expect } from 'vitest';
import { Money } from "./money";

describe("Money", () => {

    it("should create a valid Money obejct", () => {
        const money = new Money(15000);

        expect(money.getAmount()).toBe(15000);
    });

    it("Should reject negative amounts", () => {
        expect(() => new Money(-100)).toThrow();
    });

    it("Should reject decimal amounts", () => {
        expect(() => new Money(10.5)).toThrow();
    });

    it("Should add two Money objects", () => {
        const first = new Money(15000);
        const second = new Money(2500);

        expect(first.add(second).getAmount()).toBe(17500);
    });

    it("Should subtract two Money objects", () => {
        const first = new Money(15000);
        const second = new Money(2500);

        expect(first.subtract(second).getAmount()).toBe(12500);
    });

    it("Should compare equal Money objects", () => {
        const first = new Money(5000);
        const second = new Money(5000);

        expect(first.equals(second)).toBe(true);
    });

    it("Should convert kurus to TL", () => {
        const money = new Money(15000);

        expect(money.toTL()).toBe(150);
    });

    it("Should not modify the original Money object", () => {
        const first = new Money(10000);
        const second = new Money(5000);
        const result = first.add(second);

        expect(first.getAmount()).toBe(10000);
        expect(result.getAmount()).toBe(15000);
    });
});