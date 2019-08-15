import * as React from 'react';
import './styles.scss';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import * as Models from './models';
import { FuncTooltip } from './funcTooltip';

const oppositePositions = new Map<Models.TooltipPositions, Models.TooltipPositions>();
oppositePositions.set('bottom', 'top');
oppositePositions.set('top', 'bottom');
oppositePositions.set('left', 'right');
oppositePositions.set('right', 'left');

@observer
export class Tooltip extends React.PureComponent<Models.ITooltipProps> {
    private tooltipRef = React.createRef<HTMLDivElement>();

    @observable
    private tooltipPosition: Models.TooltipPositions;

    public componentDidUpdate() {
        this.invalidateTooltipPosition();
    }

    private invalidateTooltipPosition = () => {
        const { visible, node, position } = this.props;
        if (visible) {
            const rect = node.getBoundingClientRect();
            const { x, y, calculatedPosition } = this.calcTooltipCoordinates(position, rect);
            this.tooltipPosition = calculatedPosition;

            this.tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
    }

    private calcTooltipCoordinates(requestedPosition: Models.TooltipPositions, rect: ClientRect | DOMRect): Models.ICoordinatesWithPosition {
        const refRect = this.tooltipRef.current.firstElementChild.getBoundingClientRect();

        const calculatedPosition = requestedPosition;

        let x = rect.left;
        let y = rect.top;
        let cuttingDetected = false;
        switch (calculatedPosition) {
        case 'left':
            x -= refRect.width;
            y += rect.height / 2;
            cuttingDetected = x < 0 || (x + refRect.width) > document.body.clientWidth;
            break;
        case 'right':
            x += rect.width;
            y += rect.height / 2;
            cuttingDetected = x < 0 || (x + refRect.width) > document.body.clientWidth;
            break;
        case 'bottom':
            x += rect.width / 2;
            y += rect.height;
            break;
        default:
            break;
        }

        const { position, node } = this.props;
        if (cuttingDetected && position === requestedPosition) {
            return this.calcTooltipCoordinates(oppositePositions.get(position), node.getBoundingClientRect());
        }

        return { x, y, calculatedPosition };
    }

    public render() {
        const { content, visible, mouseOutCallback } = this.props;

        return (
            <FuncTooltip
                ref={this.tooltipRef}
                isVisible={visible}
                position={this.tooltipPosition}
                tooltipContent={content}
                mouseOutCallback={mouseOutCallback}
            />
        );
    }
}
