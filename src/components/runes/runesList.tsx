import * as React from 'react';
import * as Models from './models';
import { observer } from "mobx-react";
import Rune from './rune';
import './styles.scss';
import { Draggable, Droppable, DraggableStateSnapshot, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import RuneData from './runeData';
import { TooltipContext } from '../../contexts/tooltip';
import * as utils from '../../utils';
import { TooltipStateStore } from '../../stores/tooltipState';

function getStyle(style: DraggingStyle | NotDraggingStyle, snapshot: DraggableStateSnapshot) {
    if (!snapshot.isDropAnimating || !snapshot.draggingOver) {
      return style;
    }

    return {
      ...style,
      transitionDuration: `0.001s`,
    };
  }

export const DraggableContainer = (props: Models.IDraggableContainerProps) => {
    let { children, droppableId, draggableId, index } = props;
    return (
        <Droppable droppableId={droppableId}>
            {(provided) => (
                <span ref={provided.innerRef}>
                    <Draggable draggableId={draggableId} index={index}>
                        {(provided, snapshot) => (
                            <span
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getStyle(provided.draggableProps.style, snapshot)}>
                                {children}
                            </span>
                        )}
                    </Draggable>
                </span>
            )}
        </Droppable>
    );
}

@observer
export class RunesList extends React.PureComponent<Models.IRunesListProps> {
    public generateRune = () => {
        let newRune = this.props.runesStore.generateRune();
        this.props.runesStore.addRune(newRune);
    }

    public onMouseOver(e: React.MouseEvent<HTMLSpanElement, MouseEvent>, tooltipStore: TooltipStateStore, rune: Models.IRune) {
        if (document.body.classList.contains(utils.constants.dragInProgress)) {
            return;
        }
        tooltipStore.show('left', <RuneData rune={rune}></RuneData>, e.currentTarget)
    }

    public render() {
        let usedRunes = this.props.usedRunes;
        let runes = this.props.runesStore.getRunes().filter((rune) => !usedRunes.has(rune));

        return (
            <div className="runes-block">
                <div className="block-title">
                    <span className="title">Runes</span>
                    <div className="action" onClick={this.generateRune}>Generate new Rune</div>
                </div>
                <div className="runes-list">
                    {runes.map((rune, idx, arr) => {
                        let reversedIdx = arr.length - 1 - idx;
                        let reversedRune = arr[reversedIdx];
                        let socketClassName = `rune-socket ${reversedRune.rarity.toLowerCase()}`;
                        return (
                            <div className={socketClassName} key={reversedIdx}>
                                <DraggableContainer droppableId={reversedRune.id} draggableId={reversedRune.id} index={idx}>
                                    <TooltipContext.Consumer>
                                        {
                                            tooltipStore => (
                                                <span className="rune-wrapper" 
                                                    onMouseOver={(e) => {this.onMouseOver(e, tooltipStore, reversedRune)}}
                                                    onClick={(e) => {this.onMouseOver(e, tooltipStore, reversedRune)}}
                                                    onMouseOut={tooltipStore.hide}>
                                                    <Rune key={reversedIdx} rune={reversedRune} isUsed={false}></Rune>
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
