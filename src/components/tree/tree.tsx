import * as React from 'react';
import * as Models from './models';
import './tree.scss';
import { observer } from "mobx-react";

export const TreeNode = observer((props: Models.ITreeNodeProps) => {
    let {node, onSelect, nodeContent} = props;
    let onClick = () => {
        onSelect && onSelect(node);
    }
    let userContent = nodeContent && nodeContent(node);

    return (
        <div className="node-container">
            <div className="node" onClick={onClick}>{userContent}</div>
            {
                node.children && node.children.length &&
                    <div className="children-list">
                        {node.children.map((childNode, idx) => 
                            <TreeNode key={idx}  node={childNode} onSelect={onSelect} nodeContent={nodeContent}></TreeNode>
                        )}
                    </div>
            }
        </div>
    );
});

export const Tree = observer(<T extends {}>(props: Models.ITreeProps<T>) => {
    let {onSelect, nodes, children} = props;
    return (
        <div className="tree">
        {
            nodes.map((node, idx) => <TreeNode key={idx} node={node} onSelect={onSelect} nodeContent={children}></TreeNode>)
        }
        </div>
    );
});
