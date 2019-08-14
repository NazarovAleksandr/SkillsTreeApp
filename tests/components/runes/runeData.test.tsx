import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import RuneData from '../../../src/components/runes/runeData';
import {
    IRune, Rarity, RuneTypes, RunePropertyTypes,
} from '../../../src/components/runes/models';

describe('RuneData', () => {
    test('Renders positive props', () => {
        const rune: IRune = {
            id: '1',
            image: 'url',
            rarity: Rarity.common,
            type: RuneTypes.attack,
            properties: [
                { name: RunePropertyTypes.Evade, value: 10 },
            ],
        };

        const component = shallow(<RuneData rune={rune} />);

        expect(component).toMatchSnapshot('positiveProps');
    });
    test('Renders negative props', () => {
        const rune: IRune = {
            id: '1',
            image: 'url',
            rarity: Rarity.common,
            type: RuneTypes.attack,
            properties: [
                { name: RunePropertyTypes.Evade, value: -10 },
            ],
        };

        const component = shallow(<RuneData rune={rune} />);

        expect(component).toMatchSnapshot('negativeProps');
    });
    test('Renders rare rarity', () => {
        const rune: IRune = {
            id: '1',
            image: 'url',
            rarity: Rarity.rare,
            type: RuneTypes.attack,
            properties: [
                { name: RunePropertyTypes.Evade, value: -10 },
            ],
        };

        const component = shallow(<RuneData rune={rune} />);

        expect(component).toMatchSnapshot('rareRarity');
    });
    test('Renders unique rarity', () => {
        const rune: IRune = {
            id: '1',
            image: 'url',
            rarity: Rarity.unique,
            type: RuneTypes.attack,
            properties: [
                { name: RunePropertyTypes.Evade, value: -10 },
            ],
        };

        const component = shallow(<RuneData rune={rune} />);

        expect(component).toMatchSnapshot('uniqueRarity');
    });
});
