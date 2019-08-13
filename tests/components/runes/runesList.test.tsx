import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import RunesList from '../../../src/components/runes/runesList';
import { IRune, Rarity, RuneTypes, RunePropertyTypes } from '../../../src/components/runes/models';
import * as stores from '../../../src/stores';
import * as utils from '../../../src/utils';

let runesStore: stores.runes.RunesStore;
let tooltipStore: stores.tooltipState.TooltipStateStore;
let usedRunes: Set<IRune>;

beforeEach(() => {
    runesStore = new stores.runes.RunesStore();
    tooltipStore = new stores.tooltipState.TooltipStateStore();
    usedRunes = new Set();
    document.body.classList.remove(utils.constants.dragInProgress);
});

let rune: IRune = {
    id: '1',
    image: 'url',
    rarity: Rarity.common,
    type: RuneTypes.attack,
    properties: [
        {name: RunePropertyTypes.Evade, value: 10}
    ]
}

describe('RunesList', () => {
    test('Renders', () => {
        let component = shallow(<RunesList runesStore={runesStore} usedRunes={usedRunes}></RunesList>);
        expect(component).toMatchSnapshot('emptyList');

        runesStore.addRune(rune);
        component = shallow(<RunesList runesStore={runesStore} usedRunes={usedRunes}></RunesList>);
        expect(component).toMatchSnapshot('nonEmptyList');

        usedRunes.add(runesStore.getRune('1'));
        component = shallow(<RunesList runesStore={runesStore} usedRunes={usedRunes}></RunesList>);
        expect(component).toMatchSnapshot('emptyList');
    });
    test('Generates rune', () => {
        let component = shallow<RunesList>(<RunesList runesStore={runesStore} usedRunes={usedRunes}></RunesList>);

        component.instance().generateRune();
        expect(runesStore.getRunes()).toHaveLength(1);
        component.instance().generateRune();
        expect(runesStore.getRunes()).toHaveLength(2);
    });
    test('Does not show popup if drag in process', () => {
        runesStore.addRune(rune);
        let component = shallow<RunesList>(<RunesList runesStore={runesStore} usedRunes={usedRunes}></RunesList>);
        let spy = spyOn(tooltipStore, 'show');
        document.body.classList.add(utils.constants.dragInProgress);
        component.instance().onMouseOver({} as any, tooltipStore, rune);

        expect(spy).not.toBeCalled();
    });
    test('Show popup', () => {
        runesStore.addRune(rune);
        let component = shallow<RunesList>(<RunesList runesStore={runesStore} usedRunes={usedRunes}></RunesList>);
        let spy = spyOn(tooltipStore, 'show');

        component.instance().onMouseOver({} as any, tooltipStore, rune);

        expect(spy).toBeCalled();
    });
});