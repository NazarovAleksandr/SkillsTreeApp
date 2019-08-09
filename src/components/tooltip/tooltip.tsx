import * as React from 'react';
import './styles.scss';
import { observer } from "mobx-react";
import * as Models from './models';
import { FuncTooltip } from './funcTooltip';

let oppositePositions = new Map<Models.TooltipPositions, Models.TooltipPositions>();
oppositePositions.set('bottom', 'top');
oppositePositions.set('top', 'bottom');
oppositePositions.set('left', 'right');
oppositePositions.set('right', 'left');

@observer
export class Tooltip extends React.PureComponent<Models.ITooltipProps> {
    private tooltipRef = React.createRef<HTMLDivElement>();

    public componentDidUpdate() {
        this.invalidateTooltipPosition();
    }

    private invalidateTooltipPosition = () => {
        if (this.props.visible) {
            let rect = this.props.node.getBoundingClientRect();

            let { x, y, calculatedPosition } = this.calcTooltipCoordinates(this.props.position, rect);

            this.tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
    }

    private calcTooltipCoordinates(position: Models.TooltipPositions, rect: ClientRect | DOMRect): any {
        let refRect = this.tooltipRef.current.firstElementChild.getBoundingClientRect();
        
        let calculatedPosition = position;

        let x = rect.left;
        let y = rect.top;
        let cuttingDetected;
        switch (position) {
            case 'left':
                x -= refRect.width;
                y += rect.height / 2;
            break;
            case 'right':
                x += rect.width;
                y += rect.height / 2;
            break;
            case 'bottom':
                x += rect.width / 2;
                y += rect.height;
            break;
        }

        //debugger;
        cuttingDetected = (x + refRect.width) > document.body.clientWidth || 
            (y + rect.height) > document.body.clientHeight ||
            x < 0 || y < 0;

        if (cuttingDetected && this.props.position === position) {
            return this.calcTooltipCoordinates(oppositePositions.get(position), this.props.node.getBoundingClientRect());
        }

        return { x, y, calculatedPosition };
    }

    public render() {
        let tooltipContent = this.props.content;
        let position = this.props.position;
        let isVisible = this.props.visible;
        let outCallback = this.props.mouseOutCallback;

        return (
            <FuncTooltip ref={this.tooltipRef}
                isVisible={isVisible}
                position={position}
                tooltipContent={tooltipContent}
                mouseOutCallback={outCallback}>
            </FuncTooltip>
        );
    }
}
