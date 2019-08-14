import * as React from 'react';
import { shallow } from 'enzyme';
import { RunesList } from '../../../src/components/runes/runesList';
import {
    IRune, Rarity, RuneTypes, RunePropertyTypes,
} from '../../../src/components/runes/models';
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

const rune: IRune = {
    id: '1',
    image: 'url',
    rarity: Rarity.common,
    type: RuneTypes.attack,
    properties: [
        { name: RunePropertyTypes.Evade, value: 10 },
    ],
};

describe('RunesList', () => {
    test('Renders', () => {
        let component = shallow(<RunesList runesStore={runesStore} usedRunes={usedRunes} />);
        expect(component).toMatchSnapshot('emptyList');

        runesStore.addRune(rune);
        component = shallow(<RunesList runesStore={runesStore} usedRunes={usedRunes} />);
        expect(component).toMatchSnapshot('nonEmptyList');

        usedRunes.add(runesStore.getRune('1'));
        component = shallow(<RunesList runesStore={runesStore} usedRunes={usedRunes} />);
        expect(component).toMatchSnapshot('emptyList');
    });
    test('Generates rune', () => {
        const component = shallow<RunesList>(<RunesList runesStore={runesStore} usedRunes={usedRunes} />);

        component.instance().generateRune();
        expect(runesStore.getRunes()).toHaveLength(1);
        component.instance().generateRune();
        expect(runesStore.getRunes()).toHaveLength(2);
    });
    test('Does not show popup if drag in process', () => {
        runesStore.addRune(rune);
        const component = shallow<RunesList>(<RunesList runesStore={runesStore} usedRunes={usedRunes} />);
        const spy = spyOn(tooltipStore, 'show');
        document.body.classList.add(utils.constants.dragInProgress);
        component.instance().onMouseOver({} as React.MouseEvent<HTMLSpanElement, MouseEvent>, tooltipStore, rune);

        expect(spy).not.toBeCalled();
    });
    test('Show popup', () => {
        runesStore.addRune(rune);
        const component = shallow<RunesList>(<RunesList runesStore={runesStore} usedRunes={usedRunes} />);
        const spy = spyOn(tooltipStore, 'show');

        component.instance().onMouseOver({} as React.MouseEvent<HTMLSpanElement, MouseEvent>, tooltipStore, rune);

        expect(spy).toBeCalled();
    });
});
