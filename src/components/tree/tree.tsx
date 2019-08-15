import * as React from 'react';
import { observer } from 'mobx-react';
import * as Models from './models';
import './tree.scss';

export const TreeNode = observer((props: Models.ITreeNodeProps) => {
    const { node, onSelect, nodeContent } = props;
    const onClick = () => {
        if (onSelect) {
            onSelect(node);
        }
    };
    const userContent = nodeContent && nodeContent(node);

    return (
        <div className="node-container">
            <div className="node" onClick={onClick} role="button" tabIndex={0}>{userContent}</div>
            {
                node.children && node.children.length
                    && (
                        <div className="children-list">
                            {node.children.map((childNode) => <TreeNode key={childNode.id} node={childNode} onSelect={onSelect} nodeContent={nodeContent} />)}
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
                nodes.map((node) => <TreeNode key={node.id} node={node} onSelect={onSelect} nodeContent={children} />)
            }
        </div>
    );
});
