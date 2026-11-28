
import { describe, it, expect } from 'vitest';

import { Unit } from '../enums/unit';
import { Quantity } from '../value-objects/quantity';

import { DomainError } from './domain-error';
import { InsufficientStockError } from './insufficient-stock-error';

describe('InsufficientStockError', () => {

    const required = new Quantity(500, Unit.Gram);
    const available = new Quantity(300, Unit.Gram);

    it('should extend DomainError', () => {
        const error = new InsufficientStockError(
            'MEAT', required, available
        );

        expect(error).toBeInstanceOf(DomainError);
    });

    it('should have the correct error name', () => {
        const error = new InsufficientStockError(
            'MEAT', required, available
        );

        expect(error.name).toBe('InsufficientStockError');
    });

    it('should include ingredient code in message', () => {
        const error = new InsufficientStockError(
            'MEAT', required, available
        );

        expect(error.message).toContain('MEAT');
    });

    it('should include required quantity and unit', () => {
        const error = new InsufficientStockError(
            'MEAT', required, available
        );

        expect(error.message).toContain('required 500 g');
    });

    it('should include available quantity and unit', () => {
        const error = new InsufficientStockError(
            'MEAT', required, available
        );

        expect(error.message).toContain('available 300 g');
    });
});
