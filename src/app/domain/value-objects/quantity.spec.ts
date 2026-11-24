
import { describe, it, expect } from 'vitest';
import { Quantity } from './quantity';

describe('Quantity', () => {

    it('should create a valid Quantity object', () => {
        const quantity = new Quantity(500);

        expect(quantity.getAmount()).toBe(500);
    });

    it('should accept decimal amounts', () => {
        const quantity = new Quantity(2.5);

        expect(quantity.getAmount()).toBe(2.5);
    });

    it('should reject negative amounts', () => {
        expect(() => new Quantity(-100)).toThrow();
    });

    it('should reject infinite amounts', () => {
        expect(() => new Quantity(Infinity)).toThrow();
    });

    it('should add two quantities', () => {
        const first = new Quantity(500);
        const second = new Quantity(200);

        expect(first.add(second).getAmount()).toBe(700);
    });

    it('should subtract two quantities', () => {
        const first = new Quantity(500);
        const second = new Quantity(200);

        expect(first.subtract(second).getAmount()).toBe(300);
    });

    it('should compare equal quantities', () => {
        const first = new Quantity(500);
        const second = new Quantity(500);

        expect(first.equals(second)).toBe(true);
    });

    it('should return true when stock is enough', () => {
        const stock = new Quantity(500);
        const required = new Quantity(200);

        expect(stock.isEnough(required)).toBe(true);
    });

    it('should return false when stock is insufficient', () => {
        const stock = new Quantity(100);
        const required = new Quantity(200);

        expect(stock.isEnough(required)).toBe(false);
    });

    it('should reject subtraction below zero', () => {
        const stock = new Quantity(100);
        const required = new Quantity(200);

        expect(() => stock.subtract(required)).toThrow();
    });

    it('should not modify the original quantity', () => {
        const stock = new Quantity(500);
        const result = stock.subtract(new Quantity(200));

        expect(stock.getAmount()).toBe(500);
        expect(result.getAmount()).toBe(300);
    });
});
