
import { describe, it, expect } from 'vitest';

import { Unit } from '../enums/unit';
import { UnitMismatchError } from '../errors/unit-mismatch-error';

import { Quantity } from './quantity';

describe('Quantity', () => {

    it('should create a valid Quantity object', () => {
        const quantity = new Quantity(500, Unit.Gram);

        expect(quantity.getAmount()).toBe(500);
        expect(quantity.getUnit()).toBe(Unit.Gram);
    });

    it('should reject decimal amounts', () => {
        expect(() => new Quantity(2.5, Unit.Gram)).toThrow();
    });

    it('should reject negative amounts', () => {
        expect(() => new Quantity(-100, Unit.Gram)).toThrow();
    });

    it('should reject infinite amounts', () => {
        expect(() => new Quantity(Infinity, Unit.Gram)).toThrow();
    });

    it('should add two quantities', () => {
        const first = new Quantity(500, Unit.Gram);
        const second = new Quantity(200, Unit.Gram);

        expect(first.add(second).getAmount()).toBe(700);
    });

    it('should subtract two quantities', () => {
        const first = new Quantity(500, Unit.Gram);
        const second = new Quantity(200, Unit.Gram);

        expect(first.subtract(second).getAmount()).toBe(300);
    });

    it('should compare equal quantities', () => {
        const first = new Quantity(500, Unit.Gram);
        const second = new Quantity(500, Unit.Gram);

        expect(first.equals(second)).toBe(true);
    });

    it('should return true when stock is enough', () => {
        const stock = new Quantity(500, Unit.Gram);
        const required = new Quantity(200, Unit.Gram);

        expect(stock.isEnough(required)).toBe(true);
    });

    it('should return false when stock is insufficient', () => {
        const stock = new Quantity(100, Unit.Gram);
        const required = new Quantity(200, Unit.Gram);

        expect(stock.isEnough(required)).toBe(false);
    });

    it('should reject subtraction below zero', () => {
        const stock = new Quantity(100, Unit.Gram);
        const required = new Quantity(200, Unit.Gram);

        expect(() => stock.subtract(required)).toThrow();
    });

    it('should not modify the original quantity', () => {
        const stock = new Quantity(500, Unit.Gram);
        const result = stock.subtract(new Quantity(200, Unit.Gram));

        expect(stock.getAmount()).toBe(500);
        expect(result.getAmount()).toBe(300);
        expect(result.getUnit()).toBe(Unit.Gram);
    });

    it('should reject addition with different units', () => {
        const first = new Quantity(500, Unit.Gram);
        const second = new Quantity(200, Unit.Milliliter);

        expect(() => first.add(second)).toThrow(UnitMismatchError);
    });

    it('should reject subtraction with different units', () => {
        const first = new Quantity(500, Unit.Gram);
        const second = new Quantity(200, Unit.Milliliter);

        expect(() => first.subtract(second)).toThrow(UnitMismatchError);
    });

    it('should reject stock comparison with different units', () => {
        const stock = new Quantity(500, Unit.Gram);
        const required = new Quantity(200, Unit.Milliliter);

        expect(() => stock.isEnough(required)).toThrow(UnitMismatchError);
    });

    it('should not consider different units equal', () => {
        const first = new Quantity(500, Unit.Gram);
        const second = new Quantity(500, Unit.Milliliter);

        expect(first.equals(second)).toBe(false);
    });
});
