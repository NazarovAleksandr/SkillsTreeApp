import About from '../../src/pages/about';
import React = require('react');
import { shallow } from 'enzyme';

describe('About page', () => {
    test('Renders', () => {
        const component = shallow(<About></About>);
        expect(component).toMatchSnapshot();
    });
});