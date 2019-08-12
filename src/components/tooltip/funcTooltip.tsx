import * as React from 'react';
import * as Models from './models';
import { observer } from "mobx-react";

export const FuncTooltip = observer(React.forwardRef<HTMLDivElement, Models.IFuncTooltipProps>((props, ref) => {
    let { isVisible, children, tooltipContent, position, mouseOutCallback } = props;
    let tooltipPopClassName = `tooltip-pop tooltip-pop-${position}`;

    return (
        <div className="tooltip" onMouseOut={mouseOutCallback}>
            {children}
            {isVisible &&
                <div className="tooltip-pop-container" ref={ref}>
                    <span className={tooltipPopClassName}>
                        <span className="tooltip-pop-content">
                            {tooltipContent}
                        </span>
                    </span>
                </div>
            }
        </div>
    )
}));