import * as React from 'react';
import { shallow } from 'enzyme';
import Rune from '../../../src/components/runes/rune';
import {
    IRune, Rarity, RuneTypes, RunePropertyTypes,
} from '../../../src/components/runes/models';

const rune: IRune = {
    id: '1',
    image: 'url',
    rarity: Rarity.common,
    type: RuneTypes.attack,
    properties: [
        { name: RunePropertyTypes.Evade, value: 10 },
    ],
};

describe('Rune', () => {
    test('Renders not used rune', () => {
        const component = shallow(<Rune isUsed={false} rune={rune} />);

        expect(component).toMatchSnapshot('notUsedRune');
    });
    test('Renders not used rune', () => {
        const component = shallow(<Rune isUsed rune={rune} />);

        expect(component).toMatchSnapshot('usedRune');
    });
});
