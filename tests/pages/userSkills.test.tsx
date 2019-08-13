import {UserSkillsPage} from '../../src/pages/userSkills';
import React = require('react');
import { shallow } from 'enzyme';
import * as stores from '../../src/stores';
import * as utils from '../../src/utils';

let magicSchoolsStore: stores.magicSchools.MagicSchoolsStore;
let skillTreesStore: stores.skillTrees.SkillTreesStore;
let uiStateStore: stores.magicSchools.MagicSchoolsUIStateStore;
let runesStore: stores.runes.RunesStore;

beforeEach(() => {
    magicSchoolsStore = new stores.magicSchools.MagicSchoolsStore();
    skillTreesStore = new stores.skillTrees.SkillTreesStore();
    uiStateStore = new stores.magicSchools.MagicSchoolsUIStateStore();
    runesStore = new stores.runes.RunesStore();
    document.body.classList.remove(utils.constants.dragInProgress);
});

describe('UserSkills page', () => {
    test('Renders', () => {
        const component = shallow(<UserSkillsPage
            magicSchoolsStore={magicSchoolsStore}
            skillTreesStore={skillTreesStore}
            uiStateStore={uiStateStore}
            runesStore={runesStore}></UserSkillsPage>);

        expect(component).toMatchSnapshot();
    });
    test('Sets active school', () => {
        let school = magicSchoolsStore.generateSchool();
        magicSchoolsStore.addSchool(school);
        uiStateStore.setActiveSchool(school.id);

        const component = shallow<UserSkillsPage>(<UserSkillsPage
            magicSchoolsStore={magicSchoolsStore}
            skillTreesStore={skillTreesStore}
            uiStateStore={uiStateStore}
            runesStore={runesStore}></UserSkillsPage>);

        let activeSchool = component.instance().activeSchool;

        expect(activeSchool).toEqual(school);
    });
    test('Sets class to body while dragging', () => {
        const component = shallow<UserSkillsPage>(<UserSkillsPage
            magicSchoolsStore={magicSchoolsStore}
            skillTreesStore={skillTreesStore}
            uiStateStore={uiStateStore}
            runesStore={runesStore}></UserSkillsPage>);

        component.instance().onDragStart();
        expect(document.body.classList.contains(utils.constants.dragInProgress)).toEqual(true);
    });
    test('Removes class from body after dropping', () => {
        const component = shallow<UserSkillsPage>(<UserSkillsPage
            magicSchoolsStore={magicSchoolsStore}
            skillTreesStore={skillTreesStore}
            uiStateStore={uiStateStore}
            runesStore={runesStore}></UserSkillsPage>);

        component.instance().onRuneDropped({
            combine: undefined,
            destination: undefined,
            draggableId: undefined,
            mode: undefined,
            reason: undefined,
            source: undefined,
            type: undefined
        });
        expect(document.body.classList.contains(utils.constants.dragInProgress)).toEqual(false);
    });
    test('Attaches rune after dropping to node', () => {
        const component = shallow<UserSkillsPage>(<UserSkillsPage
            magicSchoolsStore={magicSchoolsStore}
            skillTreesStore={skillTreesStore}
            uiStateStore={uiStateStore}
            runesStore={runesStore}></UserSkillsPage>);
        
        let rune = runesStore.generateRune();
        runesStore.addRune(rune);
        let tree = {
            id: '1'
        };
        skillTreesStore.addTree('1', tree);

        component.instance().onRuneDropped({
            combine: undefined,
            destination: {droppableId: '1', index: 1},
            draggableId: undefined,
            mode: undefined,
            reason: undefined,
            source: {droppableId: rune.id, index: 1},
            type: undefined
        });
        
        expect(skillTreesStore.getNode('1').attachedRune).toEqual(rune);
    });
});