import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { Socket } from '../../../src/components/socket/socket';
import {
    IRune, Rarity, RuneTypes, RunePropertyTypes,
} from '../../../src/components/runes/models';
import * as utils from '../../../src/utils';

describe('Socket', () => {
    test('Renders with child', () => {
        const rune: IRune = {
            id: '1',
            image: 'url',
            rarity: Rarity.common,
            type: RuneTypes.attack,
            properties: [
                { name: RunePropertyTypes.Evade, value: 10 },
            ],
        };

        const nodeId = '1';
        const component = shallow(<Socket rune={rune} nodeId={nodeId}>test</Socket>);

        expect(component).toMatchSnapshot('socket with child');
    });
    test('Renders with rune over', () => {
        const rune: IRune = {
            id: '1',
            image: 'url',
            rarity: Rarity.common,
            type: RuneTypes.attack,
            properties: [
                { name: RunePropertyTypes.Evade, value: 10 },
            ],
        };

        const nodeId = '1';
        const component = shallow(<Socket rune={rune} nodeId={nodeId} isRuneOver>test</Socket>);

        expect(component).toMatchSnapshot('socket with rune over');
    });
    test('Renders different splashes', () => {
        const rune: IRune = {
            id: '1',
            image: 'url',
            rarity: Rarity.common,
            type: RuneTypes.attack,
            properties: [
                { name: RunePropertyTypes.Evade, value: 10 },
            ],
        };

        const nodeId = '1';
        let component = shallow(<Socket rune={rune} nodeId={nodeId} isRuneOver>test</Socket>);
        expect(component).toMatchSnapshot('socket with common splash');

        rune.rarity = Rarity.rare;
        component = shallow(<Socket rune={rune} nodeId={nodeId} isRuneOver>test</Socket>);
        expect(component).toMatchSnapshot('socket with rare splash');

        rune.rarity = Rarity.unique;
        component = shallow(<Socket rune={rune} nodeId={nodeId} isRuneOver>test</Socket>);
        expect(component).toMatchSnapshot('socket with unique splash');
    });
    test('Adds animation class', (done) => {
        const rune: IRune = {
            id: '1',
            image: 'url',
            rarity: Rarity.common,
            type: RuneTypes.attack,
            properties: [
                { name: RunePropertyTypes.Evade, value: 10 },
            ],
        };

        const nodeId = '1';
        const component = mount<Socket>(<Socket rune={rune} nodeId={nodeId} isRuneOver>test</Socket>);
        component.instance().animationTimeout = 0;
        const secondRune: IRune = {
            id: '2',
            image: 'url',
            rarity: Rarity.common,
            type: RuneTypes.attack,
            properties: [
                { name: RunePropertyTypes.Evade, value: 10 },
            ],
        };
        component.setProps({
            rune: secondRune,
        });

        expect(component.instance().socketRef.current.classList.contains(utils.constants.splashAnimated)).toEqual(true);

        setTimeout(() => {
            expect(component.instance().socketRef.current.classList.contains(utils.constants.splashAnimated)).toEqual(false);
            done();
        }, 100);
    });
});
