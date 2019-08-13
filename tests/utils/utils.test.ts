import {randomizer, uids} from '../../src/utils/index';

describe('Utils', () => {
    test('Randomizer returns properly values between range', () => {
        let three = randomizer.getRandomInt(3,3);
        let threeOrFour = randomizer.getRandomInt(3,4);
        let range = randomizer.getRandomInt(3,10);

        expect(three).toEqual(3);
        expect(threeOrFour).toBeGreaterThanOrEqual(3)
        expect(threeOrFour).toBeLessThanOrEqual(4)
        expect(range).toBeGreaterThanOrEqual(3);
        expect(range).toBeLessThanOrEqual(10);
    });
    test('Uids retirns uid with proper length', () => {
        let uid = uids.getUID();
        expect(uid).toHaveLength(36);
    });
});