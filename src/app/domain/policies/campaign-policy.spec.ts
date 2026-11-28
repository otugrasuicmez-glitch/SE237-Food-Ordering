import { describe, it, expect } from 'vitest';

import { Money } from '../value-objects/money';

import type { CampaignPolicy } from './campaign-policy';
import { MemberCampaign } from './member-campaign';
import { NoCampaign } from './no-campaign';
import { PercentOffAboveThreshold } from './percent-off-above-threshold';

describe('NoCampaign', () => {

    const policy: CampaignPolicy = new NoCampaign();

    it('should not apply a discount', () => {
        expect(
            policy.discount([new Money(50000)], false).getAmount()
        ).toBe(0);
    });

    it('should not discount member orders', () => {
        expect(
            policy.discount([new Money(50000)], true).getAmount()
        ).toBe(0);
    });

    it('should charge standard delivery fee', () => {
        expect(policy.deliveryFee(false).getAmount()).toBe(3490);
        expect(policy.deliveryFee(true).getAmount()).toBe(3490);
    });
});

describe('PercentOffAboveThreshold', () => {

    const policy: CampaignPolicy =
        new PercentOffAboveThreshold();

    it('should not discount below 400 TL', () => {
        expect(
            policy.discount([new Money(39999)], false).getAmount()
        ).toBe(0);
    });

    it('should discount exactly at 400 TL', () => {
        expect(
            policy.discount([new Money(40000)], false).getAmount()
        ).toBe(4000);
    });

    it('should calculate discount from multiple lines', () => {
        expect(
            policy.discount([
                new Money(25000),
                new Money(25000)
            ], false).getAmount()
        ).toBe(5000);
    });

    it('should round discount half-up', () => {
        expect(
            policy.discount([new Money(40005)], false).getAmount()
        ).toBe(4001);
    });

    it('should charge standard delivery fee', () => {
        expect(policy.deliveryFee(false).getAmount()).toBe(3490);
        expect(policy.deliveryFee(true).getAmount()).toBe(3490);
    });
});

describe('MemberCampaign', () => {

    const policy: CampaignPolicy = new MemberCampaign();

    it('should apply 5 percent discount for members', () => {
        expect(
            policy.discount([new Money(20000)], true).getAmount()
        ).toBe(1000);
    });

    it('should not discount non-members', () => {
        expect(
            policy.discount([new Money(20000)], false).getAmount()
        ).toBe(0);
    });

    it('should provide free delivery for members', () => {
        expect(policy.deliveryFee(true).getAmount()).toBe(0);
    });

    it('should charge delivery for non-members', () => {
        expect(policy.deliveryFee(false).getAmount()).toBe(3490);
    });

    it('should round discount separately for each line', () => {
        expect(
            policy.discount([
                new Money(15010),
                new Money(20010),
                new Money(5010)
            ], true).getAmount()
        ).toBe(2003);
    });
});