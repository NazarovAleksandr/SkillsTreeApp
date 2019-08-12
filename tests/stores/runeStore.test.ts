import {RunesStore} from '../../src/stores/runes';

describe('Runes store', () => {
    test('Generates runes', () => {
        let store = new RunesStore();
        let generated = store.generateRune();

        expect(generated).toBeDefined();
        expect(generated.id).toBeDefined();
        expect(generated.image).toBeDefined();
        expect(generated.rarity).toBeDefined();
        expect(generated.type).toBeDefined();
        expect(generated.properties).toBeDefined();
        expect(generated.properties.length).toBeGreaterThan(0);
    });
    test('Stores rune', () => {
        let store = new RunesStore();
        let generated = store.generateRune();

        expect(store.getRunes()).toHaveLength(0);
        store.addRune(generated);
        expect(store.getRunes()).toHaveLength(1);
    });
    test('Allows rune getting', () => {
        let store = new RunesStore();
        let generated = store.generateRune();
        store.addRune(generated);

        expect(store.getRune(generated.id)).toEqual(generated);
    });
    test('Return all runes', () => {
        let store = new RunesStore();
        let firstRune = store.generateRune();
        let secondRune = store.generateRune();
        store.addRune(firstRune);
        store.addRune(secondRune);

        expect(store.getRunes()).toHaveLength(2);
        expect(store.getRune(firstRune.id)).toEqual(firstRune);
        expect(store.getRune(secondRune.id)).toEqual(secondRune);
    });
});