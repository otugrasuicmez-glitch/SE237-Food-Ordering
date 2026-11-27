
import { describe, it, expect, vi } from 'vitest';

import { Unit } from '../enums/unit';
import { InsufficientStockError } from '../errors/insufficient-stock-error';
import { UnitMismatchError } from '../errors/unit-mismatch-error';
import { Quantity } from '../value-objects/quantity';

import { Ingredient } from './ingredient';
import { Inventory } from './inventory';

describe('Inventory', () => {

    function createInventory(): Inventory {
        const inventory = new Inventory();

        const ingredient = new Ingredient(
            'MEAT',
            'Ground Beef',
            Unit.Gram,
            new Quantity(200, Unit.Gram)
        );

        inventory.addIngredient(
            ingredient,
            new Quantity(1000, Unit.Gram)
        );

        return inventory;
    }

    it('should store initial stock', () => {
        const inventory = createInventory();

        expect(inventory.getStock('MEAT').getAmount())
            .toBe(1000);
    });

    it('should initialize reserved stock to zero', () => {
        const inventory = createInventory();

        expect(inventory.getReserved('MEAT').getAmount())
            .toBe(0);
    });

    it('should calculate available stock', () => {
        const inventory = createInventory();

        expect(inventory.getAvailable('MEAT').getAmount())
            .toBe(1000);
    });

    it('should increase stock when restocked', () => {
        const inventory = createInventory();

        inventory.restock(
            'MEAT', new Quantity(500, Unit.Gram)
        );

        expect(inventory.getStock('MEAT').getAmount())
            .toBe(1500);
    });

    it('should reserve available stock', () => {
        const inventory = createInventory();

        inventory.reserve(
            'MEAT', new Quantity(300, Unit.Gram)
        );

        expect(inventory.getStock('MEAT').getAmount())
            .toBe(1000);

        expect(inventory.getReserved('MEAT').getAmount())
            .toBe(300);

        expect(inventory.getAvailable('MEAT').getAmount())
            .toBe(700);
    });

    it('should reject insufficient stock', () => {
        const inventory = createInventory();

        expect(() => inventory.reserve(
            'MEAT', new Quantity(1200, Unit.Gram)
        )).toThrow(InsufficientStockError);

        expect(inventory.getReserved('MEAT').getAmount())
            .toBe(0);
    });

    it('should release reserved stock', () => {
        const inventory = createInventory();

        inventory.reserve(
            'MEAT', new Quantity(300, Unit.Gram)
        );

        inventory.release(
            'MEAT', new Quantity(100, Unit.Gram)
        );

        expect(inventory.getReserved('MEAT').getAmount())
            .toBe(200);

        expect(inventory.getAvailable('MEAT').getAmount())
            .toBe(800);
    });

    it('should consume reserved stock', () => {
        const inventory = createInventory();

        inventory.reserve(
            'MEAT', new Quantity(300, Unit.Gram)
        );

        inventory.consume(
            'MEAT', new Quantity(300, Unit.Gram)
        );

        expect(inventory.getStock('MEAT').getAmount())
            .toBe(700);

        expect(inventory.getReserved('MEAT').getAmount())
            .toBe(0);

        expect(inventory.getAvailable('MEAT').getAmount())
            .toBe(700);
    });

    it('should reject excessive release', () => {
        const inventory = createInventory();

        expect(() => inventory.release(
            'MEAT', new Quantity(100, Unit.Gram)
        )).toThrow();
    });

    it('should reject excessive consumption', () => {
        const inventory = createInventory();

        expect(() => inventory.consume(
            'MEAT', new Quantity(100, Unit.Gram)
        )).toThrow();
    });

    it('should reject mismatched units', () => {
        const inventory = createInventory();

        expect(() => inventory.reserve(
            'MEAT', new Quantity(100, Unit.Piece)
        )).toThrow(UnitMismatchError);
    });

    it('should reject unknown ingredients', () => {
        const inventory = createInventory();

        expect(() => inventory.getStock('UNKNOWN'))
            .toThrow();
    });

    it('should notify listener when stock crosses threshold', () => {
        const inventory = createInventory();

        const listener = {
            onLowStock: vi.fn()
        };

        inventory.addListener(listener);

        inventory.reserve(
            'MEAT', new Quantity(900, Unit.Gram)
        );

        expect(listener.onLowStock).toHaveBeenCalledTimes(1);

        expect(listener.onLowStock).toHaveBeenCalledWith(
            'MEAT',
            new Quantity(100, Unit.Gram),
            new Quantity(200, Unit.Gram)
        );
    });

    it('should not repeatedly notify below threshold', () => {
        const inventory = createInventory();

        const listener = {
            onLowStock: vi.fn()
        };

        inventory.addListener(listener);

        inventory.reserve(
            'MEAT', new Quantity(850, Unit.Gram)
        );

        inventory.reserve(
            'MEAT', new Quantity(50, Unit.Gram)
        );

        expect(listener.onLowStock).toHaveBeenCalledTimes(1);
    });

    it('should not notify removed listeners', () => {
        const inventory = createInventory();

        const listener = {
            onLowStock: vi.fn()
        };

        inventory.addListener(listener);
        inventory.removeListener(listener);

        inventory.reserve(
            'MEAT', new Quantity(900, Unit.Gram)
        );

        expect(listener.onLowStock).not.toHaveBeenCalled();
    });
});
