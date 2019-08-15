import * as React from 'react';
import { shallow } from 'enzyme';
import MagicSchool from '../../../src/components/magicSchools/magicSchool';

describe('MagicSchool', () => {
    test('Renders passive display', () => {
        const school = { name: 'testSchool', id: '1' };
        const component = shallow(<MagicSchool school={school} />);

        expect(component).toMatchSnapshot('passiveDisplay');
    });
    test('Renders active school', () => {
        const school = { name: 'testSchool', id: '1' };
        const component = shallow(<MagicSchool school={school} isActive />);

        expect(component).toMatchSnapshot('activeDisplay');
    });
    test('Renders is edition state', () => {
        const school = { name: 'testSchool', id: '1' };
        const component = shallow(<MagicSchool school={school} inEdition />);

        expect(component).toMatchSnapshot('inEditionState');
    });
    test('Calls select callback on click', () => {
        const school = { name: 'testSchool', id: '1' };
        const fn = jest.fn();

        const component = shallow(<MagicSchool school={school} inEdition onSelect={fn} />);
        component.find('.school').simulate('click');

        expect(fn).toBeCalled();
    });
    test('Calls callback on input bluring', () => {
        const school = { name: 'testSchool', id: '1' };
        const fn = jest.fn();

        const component = shallow(<MagicSchool school={school} inEdition onEditionEnd={fn} />);
        component.find('.input').simulate('blur');

        expect(fn).toBeCalled();
    });
});
