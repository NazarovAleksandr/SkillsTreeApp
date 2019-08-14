import * as React from 'react';
import * as Models from './models';
import './tree.scss';
import { observer } from 'mobx-react';

export const TreeNode = observer((props: Models.ITreeNodeProps) => {
    const { node, onSelect, nodeContent } = props;
    const onClick = () => {
        onSelect && onSelect(node);
    };
    const userContent = nodeContent && nodeContent(node);

    return (
        <div className="node-container">
            <div className="node" onClick={onClick}>{userContent}</div>
            {
                node.children && node.children.length
                    && (
                        <div className="children-list">
                            {node.children.map((childNode, idx) => <TreeNode key={idx} node={childNode} onSelect={onSelect} nodeContent={nodeContent} />)}
                        </div>
                    )
            }
        </div>
    );
});

export const Tree = observer(<T extends {}>(props: Models.ITreeProps<T>) => {
    const { onSelect, nodes, children } = props;
    return (
        <div className="tree">
            {
                nodes.map((node, idx) => <TreeNode key={idx} node={node} onSelect={onSelect} nodeContent={children} />)
            }
        </div>
    );
});
