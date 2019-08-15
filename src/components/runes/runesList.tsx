import * as React from 'react';
import { observer } from 'mobx-react';
import {
    Draggable, Droppable, DraggableStateSnapshot, DraggingStyle, NotDraggingStyle,
} from 'react-beautiful-dnd';
import * as Models from './models';
import Rune from './rune';
import './styles.scss';
import RuneData from './runeData';
import { TooltipContext } from '../../contexts/tooltip';
import * as utils from '../../utils';
import { TooltipStateStore } from '../../stores/tooltipState';
import { RunesStore } from '../../stores/runes';

interface IRunesListProps {
    runesStore: RunesStore;
    usedRunes: Set<Models.IRune>;
}

function getStyle(style: DraggingStyle | NotDraggingStyle, snapshot: DraggableStateSnapshot) {
    if (!snapshot.isDropAnimating || !snapshot.draggingOver) {
        return style;
    }

    return {
        ...style,
        transitionDuration: '0.001s',
    };
}

export const DraggableContainer = (props: Models.IDraggableContainerProps) => {
    const {
        children, droppableId, draggableId, index,
    } = props;
    return (
        <Droppable droppableId={droppableId}>
            {(provided) => (
                <span ref={provided.innerRef}>
                    <Draggable draggableId={draggableId} index={index}>
                        {(providedFromDraggable, snapshot) => (
                            <span
                                ref={providedFromDraggable.innerRef}
                                {...providedFromDraggable.draggableProps}
                                {...providedFromDraggable.dragHandleProps}
                                style={getStyle(providedFromDraggable.draggableProps.style, snapshot)}
                            >
                                {children}
                            </span>
                        )}
                    </Draggable>
                </span>
            )}
        </Droppable>
    );
};

@observer
export class RunesList extends React.PureComponent<IRunesListProps> {
    public generateRune = () => {
        const { runesStore } = this.props;
        const newRune = runesStore.generateRune();
        runesStore.addRune(newRune);
    }

    public onMouseOver = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, tooltipStore: TooltipStateStore, rune: Models.IRune) => {
        if (document.body.classList.contains(utils.constants.dragInProgress)) {
            return;
        }
        tooltipStore.show('left', <RuneData rune={rune} />, e.currentTarget);
    }

    public render() {
        const { usedRunes, runesStore } = this.props;
        const runes = runesStore.getRunes().filter((rune) => !usedRunes.has(rune));

        return (
            <div className="runes-block">
                <div className="block-title">
                    <span className="title">Runes</span>
                    <div className="action" onClick={this.generateRune} role="button" tabIndex={0}>Generate new Rune</div>
                </div>
                <div className="runes-list">
                    {runes.map((rune, idx, arr) => {
                        const reversedIdx = arr.length - 1 - idx;
                        const reversedRune = arr[reversedIdx];
                        const socketClassName = `rune-socket ${reversedRune.rarity.toLowerCase()}`;
                        return (
                            <div className={socketClassName} key={reversedIdx}>
                                <DraggableContainer droppableId={reversedRune.id} draggableId={reversedRune.id} index={idx}>
                                    <TooltipContext.Consumer>
                                        {
                                            (tooltipStore) => (
                                                <span
                                                    role="button"
                                                    tabIndex={0}
                                                    className="rune-wrapper"
                                                    onMouseOver={(e) => { this.onMouseOver(e, tooltipStore, reversedRune); }}
                                                    onClick={(e) => { this.onMouseOver(e, tooltipStore, reversedRune); }}
                                                    onMouseOut={tooltipStore.hide}
                                                >
                                                    <Rune key={reversedIdx} rune={reversedRune} isUsed={false} />
                                                </span>
                                            )
                                        }
                                    </TooltipContext.Consumer>
                                </DraggableContainer>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default RunesList;
