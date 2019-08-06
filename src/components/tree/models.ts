export interface ITreeNode {
    id: string;
    children?: ITreeNode[];
    isRoot?: boolean;
}

export interface ITreeNodeProps {
    node: ITreeNode;
    onSelect?: (selectedNode: ITreeNode) => void;
    nodeContent: (node: ITreeNode) => React.ReactNode;
}

export interface ITreeProps<T> {
    nodes: (ITreeNode & T)[];
    onSelect?: (selectedNode: ITreeNode & T) => void;
    children: (node: ITreeNode & T) => React.ReactNode;
}