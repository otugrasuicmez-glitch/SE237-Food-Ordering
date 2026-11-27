import { DomainError } from './domain-error';

export class InvalidTransitionError extends DomainError {
     
    constructor(from: string, to: string) {
        super(`Invalid transition from ${from} to ${to}`)
        this.name = 'InvalidTransitionError';
    }
}