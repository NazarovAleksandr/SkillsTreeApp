import { IRune } from "../runes/models";

export interface SocketProps {
    rune: IRune;
    children: React.ReactNode;
    isRuneOver?: boolean;
    nodeId: string;
}