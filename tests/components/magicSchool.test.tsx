import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Rune from '../../src/components/runes/rune';
import { IRune, Rarity, RuneTypes } from '../../src/components/runes/models';

describe('<MagicSchool />', () => {
  test('renders the component', () => {
    const rune: IRune = {
      id: '1',
      rarity: Rarity.common,
      type: RuneTypes.attack,
      image: 'url',
      properties: []
    };
    const component = shallow(<Rune isUsed={false} rune={rune}></Rune>);

    expect(component).toMatchSnapshot();
  });
});