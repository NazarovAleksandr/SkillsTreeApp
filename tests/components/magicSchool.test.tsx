import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import MagicSchool from '../../src/components/magicSchools/magicSchool';

describe('MagicSchool', () => {
    test('Renders passive display', () => {
        let school = {name: 'testSchool', id: '1'};
        const component = shallow(<MagicSchool school={school}></MagicSchool>);

        expect(component).toMatchSnapshot('passiveDisplay');
    });
    test('Renders active school', () => {
        let school = {name: 'testSchool', id: '1'};
        const component = shallow(<MagicSchool school={school} isActive={true}></MagicSchool>);

        expect(component).toMatchSnapshot('activeDisplay');
    });
    test('Renders is edition state', () => {
        let school = {name: 'testSchool', id: '1'};
        const component = shallow(<MagicSchool school={school} inEdition={true}></MagicSchool>);

        expect(component).toMatchSnapshot('inEditionState');
    });
    test('Calls select callback on click', () => {
        let school = {name: 'testSchool', id: '1'};
        const fn = jest.fn()

        const component = shallow(<MagicSchool school={school} inEdition={true} onSelect={fn}></MagicSchool>);
        component.find('.school').simulate('click');

        expect(fn).toBeCalled();
    });
    test('Calls callback on input bluring', () => {
        let school = {name: 'testSchool', id: '1'};
        const fn = jest.fn()

        const component = shallow(<MagicSchool school={school} inEdition={true} onEditionEnd={fn}></MagicSchool>);
        component.find('.input').simulate('blur');

        expect(fn).toBeCalled();
    });
});