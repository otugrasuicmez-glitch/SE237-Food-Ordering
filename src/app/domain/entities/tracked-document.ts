import { InvalidTransitionError } from '../errors/invalid-transition-error';

export abstract class TrackedDocument<TStatus extends string> {

    private readonly number: string;
    private readonly date: Date;
    private status: TStatus;
    private readonly statusHistory: TStatus[];

    protected constructor(
        number: string,
        date: Date,
        initialStatus: TStatus
    ) {
        this.number = number;
        this.date = new Date(date.getTime())
        this.status = initialStatus;
        this.statusHistory = [initialStatus];
    }

    getNumber(): string {
        return this.number;
    }

    getDate(): Date {
        return new Date(this.date.getTime())
    }

    getStatus(): TStatus {
        return this.status;
    }

    getStatusHistory(): readonly TStatus[] {
        return [...this.statusHistory]
    }

    protected abstract canTransitionTo(
        nextStatus: TStatus
    ): boolean;

    protected transitionTo(nextStatus: TStatus): void {

        if (!this.canTransitionTo(nextStatus)) {
            throw new InvalidTransitionError(
                this.status,
                nextStatus
            );
        }

        this.status = nextStatus;
        this.statusHistory.push(nextStatus)
    }
}