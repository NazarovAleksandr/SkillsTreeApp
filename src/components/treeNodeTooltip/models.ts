import { ISkillsTreeNode } from '../skillsTree/models';

export interface ITreeNodeTooltip {
    onAdd: () => void;
    onRemove: () => void;
    node: ISkillsTreeNode;
}