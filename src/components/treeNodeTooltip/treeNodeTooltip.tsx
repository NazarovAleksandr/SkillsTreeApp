import * as React from 'react';
import { observer } from 'mobx-react';
import './styles.scss';
import * as Models from './models';
import RuneData from '../runes/runeData';

const TreeNodeTooltip = (props: Models.ITreeNodeTooltip) => {
    const { onAdd, onRemove, node } = props;
    const runeInfo = node && node.attachedRune
        ? (
            <div className="rune-info">
                <RuneData rune={node.attachedRune} />
            </div>
        )
        : <div>No runes attached</div>;

    const disableableClassName = `action${node.isRoot ? ' disabled' : ''}`;

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
};

export default observer(TreeNodeTooltip);
