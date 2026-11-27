
import { Money } from '../value-objects/money';

import type { CampaignPolicy } from './campaign-policy';

export class MemberCampaign implements CampaignPolicy {

    discount(
        lineTotals: readonly Money[],
        isMember: boolean
    ): Money {

        if (!isMember) {
            return new Money(0);
        }

        let totalDiscount = new Money(0);

        for (const lineTotal of lineTotals) {

            const lineDiscount = new Money(
                Number(
                    (BigInt(lineTotal.getAmount()) * 5n + 50n) / 100n
                )
            );

            totalDiscount = totalDiscount.add(lineDiscount);
        }

        return totalDiscount;
    }

    deliveryFee(isMember: boolean): Money {
        return new Money(isMember ? 0 : 3490);
    }
}
