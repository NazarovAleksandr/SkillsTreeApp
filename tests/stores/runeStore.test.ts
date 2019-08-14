import { RunesStore } from '../../src/stores/runes';

describe('Runes store', () => {
    test('Generates runes', () => {
        const store = new RunesStore();
        const generated = store.generateRune();

        expect(generated).toBeDefined();
        expect(generated.id).toBeDefined();
        expect(generated.image).toBeDefined();
        expect(generated.rarity).toBeDefined();
        expect(generated.type).toBeDefined();
        expect(generated.properties).toBeDefined();
        expect(generated.properties.length).toBeGreaterThan(0);
    });
    test('Stores rune', () => {
        const store = new RunesStore();
        const generated = store.generateRune();

        expect(store.getRunes()).toHaveLength(0);
        store.addRune(generated);
        expect(store.getRunes()).toHaveLength(1);
    });
    test('Allows rune getting', () => {
        const store = new RunesStore();
        const generated = store.generateRune();
        store.addRune(generated);

        expect(store.getRune(generated.id)).toEqual(generated);
    });
    test('Return all runes', () => {
        const store = new RunesStore();
        const firstRune = store.generateRune();
        const secondRune = store.generateRune();
        store.addRune(firstRune);
        store.addRune(secondRune);

        expect(store.getRunes()).toHaveLength(2);
        expect(store.getRune(firstRune.id)).toEqual(firstRune);
        expect(store.getRune(secondRune.id)).toEqual(secondRune);
    });
});
