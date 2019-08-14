import { SkillTreesStore } from '../../src/stores/skillTrees';
import { Rarity, RuneTypes, RunePropertyTypes } from '../../src/components/runes/models';
import { ISkillsTreeNode } from '../../src/components/skillsTree/models';

describe('SkillTrees store', () => {
    test('Adds tree', () => {
        const store = new SkillTreesStore();
        const tree = {
            id: '1',
            children: [
                { id: '2' },
            ],
        };

        store.addTree('1', tree);

        expect(store.getTree('1')).toEqual(tree);
    });
    test('Removes tree', () => {
        const store = new SkillTreesStore();
        const tree = {
            id: '1',
            children: [
                { id: '2' },
            ],
        };

        store.addTree('1', tree);
        store.removeTree('1');

        expect(store.getTree('1')).toEqual(undefined);
    });
    test('Creates tree', () => {
        const store = new SkillTreesStore();
        store.createTree('1');

        const tree = store.getTree('1');
        expect(tree).toBeTruthy();
        expect(tree.isRoot).toEqual(undefined);
        expect(tree.children).toEqual(undefined);
        expect(tree.attachedRune).toEqual(undefined);
        expect(tree.id).toBeTruthy();
    });
    test('Finds specific node of trees', () => {
        const store = new SkillTreesStore();
        const childNode = { id: '2' };
        const tree = {
            id: '1',
            children: [
                childNode,
            ],
        };

        store.addTree('1', tree);
        const node = store.getNode('2');

        expect(node).toEqual(childNode);
    });
    test('Calculates total nodes count', () => {
        const store = new SkillTreesStore();
        const tree1 = {
            id: '1',
            children: [
                { id: '2' },
            ],
        };
        const tree2 = {
            id: '3',
            children: [
                { id: '4' },
                { id: '5' },
            ],
        };
        store.addTree('1', tree1);
        store.addTree('2', tree2);

        expect(store.totalNodesCount).toEqual(5);
    });
    test('Calculates total nodes count', () => {
        const store = new SkillTreesStore();
        const rune = {
            id: '1',
            rarity: Rarity.common,
            properties: [{ name: RunePropertyTypes.Evade, value: 10 }],
            type: RuneTypes.attack,
            image: '',
        };
        const rune2 = {
            id: '2',
            rarity: Rarity.common,
            properties: [{ name: RunePropertyTypes.Evade, value: 10 }],
            type: RuneTypes.attack,
            image: '',
        };
        const tree: ISkillsTreeNode = {
            id: '1',
            children: [
                { id: '2', attachedRune: rune },
                { id: '3' },
            ],
        };

        store.addTree('1', tree);
        expect(store.attachedRunes.size).toEqual(1);

        const node = store.getNode('3');
        node.attachedRune = rune2;
        expect(store.attachedRunes.size).toEqual(2);
    });
});
