import * as React from 'react';
import { observer } from 'mobx-react';
import { Droppable } from 'react-beautiful-dnd';
import { Tree } from '../tree/tree';
import { ISkillsTreeNode } from './models';
import TreeNodeTooltip from '../treeNodeTooltip/treeNodeTooltip';
import './styles.scss';
import Rune from '../runes/rune';
import { TooltipContext } from '../../contexts/tooltip';
import * as utils from '../../utils';
import { Socket } from '../socket/socket';
import { SkillTreesStore } from '../../stores/skillTrees';

interface SkillsTreeProps {
    relatedSchoolId: string;
    treeStore: SkillTreesStore;
}

class SkillsTree extends React.PureComponent<SkillsTreeProps> {
    static contextType = TooltipContext;

    context!: React.ContextType<typeof TooltipContext>;

    public onRemoveNode(node: ISkillsTreeNode) {
        if (node.isRoot) {
            return;
        }

        this.removeChildFromParent(node);
        this.cleanUpNodeRecursive(node, (nodeToClear) => {
            nodeToClear.attachedRune = undefined;
            this.childToParent.delete(nodeToClear);
        });
        const { context } = this;
        context.hide();
    }

    public childToParent: Map<ISkillsTreeNode, ISkillsTreeNode> = new Map();

    public onSelectNode(node: ISkillsTreeNode) {
        const newNode = {
            id: utils.uids.getUID(),
        };
        if (!node.children) {
            node.children = [];
        }
        const length = node.children.push(newNode);
        this.childToParent.set(node.children[length - 1], node);
        const { context } = this;
        context.hide();
    }

    public onMouseOut = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const related = e.relatedTarget as HTMLElement;
        if (!related.closest('.tooltip')) {
            const { context } = this;
            context.hide();
        }
    }

    public onMouseOver(e: React.MouseEvent<HTMLElement, MouseEvent>, node: ISkillsTreeNode) {
        if (document.body.classList.contains(utils.constants.dragInProgress)) {
            return;
        }

        const tooltipContent = <TreeNodeTooltip node={node} onAdd={() => this.onSelectNode(node)} onRemove={() => this.onRemoveNode(node)} />;

        const { context } = this;
        context.show('right', tooltipContent, e.currentTarget, this.onMouseOutFromPopup);
    }

    public setChildToParent(node: ISkillsTreeNode) {
        if (node) {
            if (node.children) {
                node.children.forEach((child) => {
                    this.childToParent.set(child, node);
                    if (child.children) {
                        this.setChildToParent(child);
                    }
                });
            }
        }
    }

    private onMouseOutFromPopup = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const related = e.relatedTarget as HTMLElement;
        if (!related.closest('.tooltip') && !related.closest('.rune-wrapper')) {
            const { context } = this;
            context.hide();
        }
    }

    public removeChildFromParent(node: ISkillsTreeNode) {
        const parent = this.childToParent.get(node);
        const idx = parent.children.findIndex((child) => child === node);
        if (idx > -1) {
            parent.children.splice(idx, 1);
            if (parent.children.length === 0) {
                parent.children = undefined;
            }
        }
    }

    public cleanUpNodeRecursive(node: ISkillsTreeNode, callback: (node: ISkillsTreeNode) => void) {
        callback(node);
        if (node.children) {
            node.children.forEach((child) => {
                this.cleanUpNodeRecursive(child, callback);
            });
        }
    }

    private getDroppableSocket(node: ISkillsTreeNode) {
        return (
            <Droppable droppableId={node.id}>
                {(provided, snapshot) => (
                    <span className="socket-wrapper" ref={provided.innerRef}>
                        <Socket rune={node.attachedRune} nodeId={node.id} isRuneOver={snapshot.isDraggingOver}>
                            <span
                                role="button"
                                tabIndex={0}
                                className="rune-wrapper"
                                onMouseOver={(e) => { this.onMouseOver(e, node); }}
                                onClick={(e) => { this.onMouseOver(e, node); }}
                                onMouseOut={this.onMouseOut}
                            >
                                {node.attachedRune && <Rune rune={node.attachedRune} isUsed={false} />}
                            </span>
                        </Socket>
                    </span>
                )}
            </Droppable>
        );
    }

    render() {
        const { relatedSchoolId, treeStore } = this.props;
        let treeNodes: ISkillsTreeNode[] = [];
        if (relatedSchoolId) {
            const tree = treeStore.getTree(relatedSchoolId);
            treeNodes = tree ? [tree] : [];
            this.childToParent.clear();
            this.setChildToParent(tree);
        }

        return (
            <div className="skillsTree-block">
                <div className="block-title"><span className="title">Skills Tree</span></div>
                <div className="tree-scrollable-container">
                    <table className="tree-verticalizer">
                        <tbody>
                            <tr>
                                <td>
                                    <Tree<ISkillsTreeNode> nodes={treeNodes}>
                                        {
                                            (node) => this.getDroppableSocket(node)
                                        }
                                    </Tree>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default observer(SkillsTree);
