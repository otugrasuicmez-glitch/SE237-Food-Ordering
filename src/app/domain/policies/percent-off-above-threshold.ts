
import { Money } from '../value-objects/money';

import type { CampaignPolicy } from './campaign-policy';

export class PercentOffAboveThreshold implements CampaignPolicy {

    discount(
        lineTotals: readonly Money[],
        _isMember: boolean
    ): Money {

        let subtotal = new Money(0);

        for (const lineTotal of lineTotals) {
            subtotal = subtotal.add(lineTotal);
        }

        if (subtotal.getAmount() < 40000) {
            return new Money(0);
        }

        return new Money(
            Number(
                (BigInt(subtotal.getAmount()) * 10n + 50n) / 100n
            )
        );
    }

    deliveryFee(_isMember: boolean): Money {
        return new Money(3490);
    }
}

