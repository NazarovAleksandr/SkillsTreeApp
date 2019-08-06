import { ReactNode } from "react";

export type TooltipPositions = 'left' | 'right' | 'top' | 'bottom';

export interface ITooltipProps {
    content?: React.ReactNode;
    position: TooltipPositions;
    node: any;
    visible: boolean;
    mouseOutCallback?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface IFuncTooltipProps {
    isVisible: boolean;
    children: ReactNode;
    tooltipContent: ReactNode;
    position: TooltipPositions;
    mouseOutCallback?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}