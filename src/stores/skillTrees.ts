import {
    observable, action, computed, IObservableArray,
} from 'mobx';
import * as RuneModels from '../components/runes/models';
import * as utils from '../utils';
import { ISkillsTreeNode } from '../components/skillsTree/models';


export class SkillTreesStore {
    @observable private trees: IObservableArray<ISkillsTreeNode>;

    @observable private schoolIdToTree: {[key: string]: ISkillsTreeNode}

    constructor() {
        this.trees = observable([]);
        this.schoolIdToTree = {};
    }

    @action.bound
    public removeTree(schoolId: string) {
        const treeToRemove = this.schoolIdToTree[schoolId];
        const idx = this.trees.findIndex((tree) => tree === treeToRemove);
        if (idx > -1) {
            this.trees.splice(idx, 1);
            this.schoolIdToTree[schoolId] = undefined;
        }
    }

    @action.bound
    public addTree(schoolId: string, tree: ISkillsTreeNode) {
        this.schoolIdToTree[schoolId] = tree;
        this.trees.push(this.schoolIdToTree[schoolId]);
    }

    @action.bound
    public createTree(schoolId: string, isRoot = false) {
        const newTree: ISkillsTreeNode = { id: utils.uids.getUID() };
        if (isRoot) {
            newTree.isRoot = true;
        }
        this.schoolIdToTree[schoolId] = newTree;
        this.trees.push(this.schoolIdToTree[schoolId]);
    }

    @computed
    get totalNodesCount() {
        let count = 0;
        this.trees.forEach((tree) => {
            count += 1;
            if (tree.children) {
                tree.children.forEach((child) => {
                    count += this.getLength(child);
                });
            }
        });
        return count;
    }

    @computed
    get attachedRunes() {
        let runes: RuneModels.IRune[] = [];
        this.trees.forEach((tree) => {
            runes = [...runes, ...this.getRunes(tree)];
        });
        return new Set(runes);
    }

    public getNode(nodeId: string): ISkillsTreeNode {
        let found;
        this.trees.find((node) => {
            found = this.findNode(node, nodeId);
            return found;
        });
        return found;
    }

    private findNode(node: ISkillsTreeNode, id: string) {
        let found;
        if (node.id === id) {
            found = node;
        }
        if (!found && node.children) {
            node.children.find((child) => {
                found = this.findNode(child, id);
                return found;
            });
        }
        return found;
    }

    private getRunes(tree: ISkillsTreeNode) {
        let runes: RuneModels.IRune[] = [];
        if (tree.attachedRune) {
            runes.push(tree.attachedRune);
        }
        if (tree.children) {
            tree.children.forEach((child) => {
                runes = [...runes, ...this.getRunes(child)];
            });
        }
        return runes;
    }

    private getLength(tree: ISkillsTreeNode) {
        let count = 1;
        if (tree.children) {
            tree.children.forEach((child) => {
                count += this.getLength(child);
            });
        }
        return count;
    }

    public getTree(schoolId: string) {
        return this.schoolIdToTree[schoolId];
    }
}
