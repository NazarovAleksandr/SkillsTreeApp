import React = require("react");
import { TooltipStateStore } from "../stores/tooltipState";

export const TooltipContext = React.createContext<TooltipStateStore | undefined>(undefined);