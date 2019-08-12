import {MagicSchoolsStore, MagicSchoolsUIStateStore} from '../../src/stores/magicSchool';

describe('MagicSchools UI store', () => {
    test('Selects school', () => {
        let store = new MagicSchoolsUIStateStore();
        store.setActiveSchool('1');

        expect(store.getSelectedSchoolId()).toEqual('1');
    });
    test('Deselects school', () => {
        let store = new MagicSchoolsUIStateStore();
        store.setActiveSchool('1');
        store.deselectSchool();

        expect(store.getSelectedSchoolId()).toEqual(undefined);
    });
    test('Returns selected school', () => {
        let store = new MagicSchoolsUIStateStore();
        store.setActiveSchool('1');
        store.setActiveSchool('2');

        expect(store.getSelectedSchoolId()).toEqual('2');
    });
    test('Starts edition of selected school', () => {
        let store = new MagicSchoolsUIStateStore();
        store.startSchoolEdition();

        expect(store.isInEditionState()).toBeFalsy(); //ololo

        store.setActiveSchool('1');
        store.startSchoolEdition();
        expect(store.isInEditionState()).toEqual(true);
    });
    test('Resets school edition after select the new one', () => {
        let store = new MagicSchoolsUIStateStore();
        store.setActiveSchool('1');
        store.startSchoolEdition();
        store.setActiveSchool('2');

        expect(store.isInEditionState()).toEqual(false);
    });
    test('Resets school edition after deselect', () => {
        let store = new MagicSchoolsUIStateStore();
        store.setActiveSchool('1');
        store.startSchoolEdition();
        store.deselectSchool();

        expect(store.isInEditionState()).toEqual(false);
    });
});

describe('MagicSchools store', () => {
    test('Generates school', () => {
        let store = new MagicSchoolsStore();
        let generated = store.generateSchool();

        expect(generated).toBeDefined();
        expect(generated.id).toBeDefined();
        expect(generated.name).toBeDefined();
    });
    test('Stores school', () => {
        let store = new MagicSchoolsStore();
        let generated = store.generateSchool();

        expect(store.getSchools()).toHaveLength(0);
        store.addSchool(generated);
        expect(store.getSchools()).toHaveLength(1);
    });
    test('Allows school getting', () => {
        let store = new MagicSchoolsStore();
        let generated = store.generateSchool();
        store.addSchool(generated);

        expect(store.getSchool(generated.id)).toEqual(generated);
    });
    test('Return all schools', () => {
        let store = new MagicSchoolsStore();
        let firstSchool = store.generateSchool();
        let secondSchool = store.generateSchool();
        store.addSchool(firstSchool);
        store.addSchool(secondSchool);

        expect(store.getSchools()).toHaveLength(2);
        expect(store.getSchool(firstSchool.id)).toEqual(firstSchool);
        expect(store.getSchool(secondSchool.id)).toEqual(secondSchool);
    });
});