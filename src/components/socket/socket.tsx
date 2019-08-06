import * as React from 'react';
import { SocketProps } from './models';

export class Socket extends React.PureComponent<SocketProps> {
    private socketRef = React.createRef<HTMLSpanElement>();

    public componentDidUpdate(prevProps: SocketProps) {
        if (prevProps.rune !== this.props.rune && this.props.nodeId === prevProps.nodeId) {
            this.socketRef.current.classList.add('splash-animated');
            setTimeout(() => {
                this.socketRef.current.classList.remove('splash-animated');
            }, 1000);
        }
    }

    public render() {
        let { children, rune, isRuneOver } = this.props;
        let socketClassName = `rune-socket ${isRuneOver ? 'drop-allowed' : ''} ${rune ? rune.rarity.toLowerCase() + '-splash' : ''}`;
        return (
            <span className={socketClassName} ref={this.socketRef}>
                {children}
            </span>
        );
    }
}