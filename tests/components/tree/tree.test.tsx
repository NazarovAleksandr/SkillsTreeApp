import * as React from 'react';
import { shallow } from 'enzyme';
import { Tree, TreeNode } from '../../../src/components/tree/tree';

describe('Tree', () => {
    test('Renders roots', () => {
        const tree = [{
            id: '1',
            children: [{ id: '2' }],
        }, {
            id: '3',
            children: [{ id: '4' }],
        }];
        const component = shallow(<Tree nodes={tree}>{() => (123)}</Tree>);

        expect(component).toMatchSnapshot('roots');
    });
    test('Renders TreeNode', () => {
        const tree = {
            id: '1',
            children: [{ id: '2' }, { id: '3' }],
        };
        const component = shallow(<TreeNode node={tree} nodeContent={(node) => (node.id)} />);

        expect(component).toMatchSnapshot('tree node');
    });
    test('Calls callback', () => {
        const tree = {
            id: '1',
            children: [{ id: '2' }, { id: '3' }],
        };
        const fn = jest.fn();
        const component = shallow(<TreeNode node={tree} onSelect={fn} nodeContent={(node) => (node.id)} />);
        component.find('.node').simulate('click');

        expect(fn).toBeCalled();
    });
});
