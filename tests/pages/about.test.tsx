import { shallow } from 'enzyme';
import About from '../../src/pages/about';

import React = require('react');

describe('About page', () => {
    test('Renders', () => {
        const component = shallow(<About />);
        expect(component).toMatchSnapshot();
    });
});
