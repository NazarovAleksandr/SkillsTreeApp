import * as React from 'react';
import { observer } from 'mobx-react';
import * as Models from './models';

const tooltip = (props: Models.IFuncTooltipProps, ref: React.Ref<HTMLDivElement>) => {
    const {
        isVisible, children, tooltipContent, position, mouseOutCallback,
    } = props;
    const tooltipPopClassName = `tooltip-pop tooltip-pop-${position}`;

    return (
        <div className="tooltip" onMouseOut={mouseOutCallback}>
            {children}
            {isVisible
                && (
                    <div className="tooltip-pop-container" ref={ref}>
                        <span className={tooltipPopClassName}>
                            <span className="tooltip-pop-content">
                                {tooltipContent}
                            </span>
                        </span>
                    </div>
                )}
        </div>
    );
};

export const FuncTooltip = observer(React.forwardRef<HTMLDivElement, Models.IFuncTooltipProps>(tooltip));
