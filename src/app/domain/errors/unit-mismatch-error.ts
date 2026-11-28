import type { Unit } from '../enums/unit';

import { DomainError } from './domain-error';

export class UnitMismatchError extends DomainError {
    constructor(expected: Unit, actual: Unit) {
        super(`Unit mismatch: expected ${expected}, received ${actual}`);
        this.name = "UnitMismatchError";
    }
}

