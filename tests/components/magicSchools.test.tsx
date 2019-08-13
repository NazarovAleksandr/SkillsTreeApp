import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import MagicSchools from '../../src/components/magicSchools/magicSchools';
import * as stores from '../../src/stores';

let magicSchoolsStore: stores.magicSchools.MagicSchoolsStore;
let uiStateStore: stores.magicSchools.MagicSchoolsUIStateStore;

beforeEach(() => {
    magicSchoolsStore = new stores.magicSchools.MagicSchoolsStore();
    uiStateStore = new stores.magicSchools.MagicSchoolsUIStateStore();
});

describe('MagicSchools', () => {
    test('Renders', () => {
        let school = {id: '1', name: '1'};
        let school2 = {id: '2', name: '2'};
        magicSchoolsStore.addSchool(school);
        magicSchoolsStore.addSchool(school2);

        const component = shallow(<MagicSchools schoolsStore={magicSchoolsStore} uiStateStore={uiStateStore} ></MagicSchools>);

        expect(component).toMatchSnapshot();
    });
    test('Adds new school', () => {
        const component = shallow<MagicSchools>(<MagicSchools schoolsStore={magicSchoolsStore} uiStateStore={uiStateStore} ></MagicSchools>);

        component.instance().addNewItem();

        expect(magicSchoolsStore.getSchools()).toHaveLength(1);
        expect(uiStateStore.isInEditionState()).toEqual(true);
    });
    test('Removes school', () => {
        const component = shallow<MagicSchools>(<MagicSchools schoolsStore={magicSchoolsStore} uiStateStore={uiStateStore} ></MagicSchools>);
        let school = {id: '1', name: '1'};
        magicSchoolsStore.addSchool(school);

        uiStateStore.setActiveSchool('1');
        component.instance().deleteItem();

        expect(magicSchoolsStore.getSchools()).toHaveLength(0);
        expect(uiStateStore.getSelectedSchoolId()).toBeFalsy();
    });
    test('Makes school editable', () => {
        const component = shallow<MagicSchools>(<MagicSchools schoolsStore={magicSchoolsStore} uiStateStore={uiStateStore} ></MagicSchools>);
        let school = {id: '1', name: '1'};
        magicSchoolsStore.addSchool(school);

        uiStateStore.setActiveSchool('1');
        component.instance().startEdition();

        expect(uiStateStore.isInEditionState()).toEqual(true);
        expect(component).toMatchSnapshot('One school is in edition state');
    });
    test('Starts edition on select', () => {
        const component = shallow<MagicSchools>(<MagicSchools schoolsStore={magicSchoolsStore} uiStateStore={uiStateStore} ></MagicSchools>);
        let school = {id: '1', name: '1'};
        
        component.instance().onEditionEnd(school, 'new');

        expect(school.name).toEqual('new');
        expect(uiStateStore.isInEditionState()).toEqual(false);
    });
});