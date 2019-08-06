import * as React from 'react';
import './styles.scss';
import { observer } from "mobx-react";
import * as Models from './models';
import { FuncTooltip } from './funcTooltip';

@observer
export class Tooltip extends React.PureComponent<Models.ITooltipProps> {
    private tooltipRef = React.createRef<HTMLDivElement>();

    public componentDidMount() {
        window.addEventListener('scroll', this.invalidateTooltipPosition, {
            capture: true,
            passive: true
        });
    }

    public componentWillUnmount() {
        window.removeEventListener('scroll', this.invalidateTooltipPosition, true);
    }

    public componentDidUpdate() {
        this.invalidateTooltipPosition();
    }

    private invalidateTooltipPosition = () => {
        if (this.props.visible) {
            let tooltipContainer = this.props.node;
            let rect = tooltipContainer.getBoundingClientRect();
            let refRect = this.tooltipRef.current.firstElementChild.getBoundingClientRect();

            let x = rect.left;
            let y = rect.top;

            switch (this.props.position) {
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

            this.tooltipRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
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
