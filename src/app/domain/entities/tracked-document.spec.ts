
import { describe, it, expect } from 'vitest';

import { InvalidTransitionError } from '../errors/invalid-transition-error';

import { TrackedDocument } from './tracked-document';

type TestStatus = 'Draft' | 'Confirmed' | 'Cancelled';

class TestDocument extends TrackedDocument<TestStatus> {

    constructor(date: Date = new Date('2026-11-27')) {
        super('DOC-001', date, 'Draft');
    }

    protected override canTransitionTo(
        nextStatus: TestStatus
    ): boolean {
        return this.getStatus() === 'Draft' &&
            (nextStatus === 'Confirmed' ||
             nextStatus === 'Cancelled');
    }

    confirm(): void {
        this.transitionTo('Confirmed');
    }

    cancel(): void {
        this.transitionTo('Cancelled');
    }
}

describe('TrackedDocument', () => {

    it('should store document number', () => {
        const document = new TestDocument();

        expect(document.getNumber()).toBe('DOC-001');
    });

    it('should store initial status', () => {
        const document = new TestDocument();

        expect(document.getStatus()).toBe('Draft');
    });

    it('should record initial status in history', () => {
        const document = new TestDocument();

        expect(document.getStatusHistory()).toEqual([
            'Draft'
        ]);
    });

    it('should allow a valid transition', () => {
        const document = new TestDocument();

        document.confirm();

        expect(document.getStatus()).toBe('Confirmed');
    });

    it('should record status transitions', () => {
        const document = new TestDocument();

        document.confirm();

        expect(document.getStatusHistory()).toEqual([
            'Draft',
            'Confirmed'
        ]);
    });

    it('should reject an invalid transition', () => {
        const document = new TestDocument();

        document.confirm();

        expect(() => document.cancel())
            .toThrow(InvalidTransitionError);
    });

    it('should preserve state after rejected transition', () => {
        const document = new TestDocument();

        document.confirm();

        expect(() => document.cancel())
            .toThrow(InvalidTransitionError);

        expect(document.getStatus()).toBe('Confirmed');

        expect(document.getStatusHistory()).toEqual([
            'Draft',
            'Confirmed'
        ]);
    });

    it('should protect status history from external changes', () => {
        const document = new TestDocument();

        const history = document.getStatusHistory();
        (history as TestStatus[]).push('Cancelled');

        expect(document.getStatusHistory()).toEqual([
            'Draft'
        ]);
    });

    it('should protect date from external changes', () => {
        const date = new Date('2026-11-27');
        const document = new TestDocument(date);

        date.setFullYear(2030);
        document.getDate().setFullYear(2040);

        expect(document.getDate().getFullYear()).toBe(2026);
    });

    it('should allow cancellation from draft', () => {
        const document = new TestDocument();

        document.cancel();

        expect(document.getStatus()).toBe('Cancelled');
    });
});
