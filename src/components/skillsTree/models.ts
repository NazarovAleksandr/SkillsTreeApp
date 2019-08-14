import { SkillTreesStore } from '../../stores/skillTrees';
import { IRune } from '../runes/models';
import { ITreeNode } from '../tree/models';

export interface SkillsTreeProps {
    relatedSchoolId: string;
    treeStore: SkillTreesStore;
}

export interface ISkillsTreeNode extends ITreeNode {
    attachedRune?: IRune;
    children?: ISkillsTreeNode[];
}
