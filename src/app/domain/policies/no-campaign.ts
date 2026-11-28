
import { Money } from '../value-objects/money';

import type { CampaignPolicy } from './campaign-policy';

export class NoCampaign implements CampaignPolicy {

    discount(
        _lineTotals: readonly Money[],
        _isMember: boolean
    ): Money {
        return new Money(0);
    }

    deliveryFee(_isMember: boolean): Money {
        return new Money(3490);
    }
}

