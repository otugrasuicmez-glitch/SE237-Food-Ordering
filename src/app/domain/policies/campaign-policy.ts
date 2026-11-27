import type { Money } from '../value-objects/money';

export interface CampaignPolicy {
    discount(
        lineTotals: readonly Money[],
        isMember: boolean
    ): Money;

    deliveryFee(isMember: boolean): Money;
}