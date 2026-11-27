
import type { Quantity } from '../value-objects/quantity';

import { DomainError } from './domain-error';

export class InsufficientStockError extends DomainError {

    constructor(
        ingredientCode: string,
        required: Quantity,
        available: Quantity
    ) {
        super(
            `Insufficient stock for ${ingredientCode}: ` +
            `required ${required.getAmount()} ${required.getUnit()}, ` +
            `available ${available.getAmount()} ${available.getUnit()}`
        );

        this.name = 'InsufficientStockError';
    }
}


