import { IRune } from '../runes/models';
import { ITreeNode } from '../tree/models';

export interface ISkillsTreeNode extends ITreeNode {
    attachedRune?: IRune;
    children?: ISkillsTreeNode[];
}
