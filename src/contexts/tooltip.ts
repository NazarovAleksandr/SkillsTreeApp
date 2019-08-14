import { TooltipStateStore } from '../stores/tooltipState';

import React = require('react');

export const TooltipContext = React.createContext<TooltipStateStore | undefined>(undefined);
