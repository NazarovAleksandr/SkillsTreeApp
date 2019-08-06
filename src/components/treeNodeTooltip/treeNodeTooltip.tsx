import * as React from 'react';
import { observer } from "mobx-react";
import './styles.scss';
import * as Models from './models';
import RuneData from '../runes/runeData';

const TreeNodeTooltip = (props: Models.ITreeNodeTooltip) => {
    let { onAdd, onRemove, node } = props;
    let runeInfo = node && node.attachedRune ? 
        <div className="rune-info">
            <RuneData rune={node.attachedRune}></RuneData>
        </div> :
        <div>No runes attached</div>

    let disableableClassName = `action${node.isRoot ? ' disabled' : ''}`;

    return (
        <div className="tree-node-tooltip">
            <div className="actions">
                <div className="action" onClick={onAdd}>Add child</div>
                <div className={disableableClassName} onClick={onRemove}>Remove node</div>
            </div>
            <div className="node-info">
                {runeInfo}
            </div>
        </div>
    );
}

export default observer(TreeNodeTooltip);
