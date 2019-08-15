import * as React from 'react';
import { SocketProps } from './models';
import { constants } from '../../utils';

export class Socket extends React.PureComponent<SocketProps> {
    public socketRef = React.createRef<HTMLSpanElement>();

    public animationTimeout = 1000;

    public componentDidUpdate(prevProps: SocketProps) {
        const { rune, nodeId } = this.props;
        if (prevProps.rune !== rune && nodeId === prevProps.nodeId) {
            this.socketRef.current.classList.add(constants.splashAnimated);
            setTimeout(() => {
                this.socketRef.current.classList.remove(constants.splashAnimated);
            }, this.animationTimeout);
        }
    }

    public render() {
        const { children, rune, isRuneOver } = this.props;
        const socketClassName = `rune-socket ${isRuneOver ? 'drop-allowed' : ''} ${rune ? `${rune.rarity.toLowerCase()}-splash` : ''}`;
        return (
            <span className={socketClassName} ref={this.socketRef}>
                {children}
            </span>
        );
    }
}
