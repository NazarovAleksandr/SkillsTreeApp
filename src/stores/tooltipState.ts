import { observable, action } from "mobx";
import * as Models from '../components/tooltip/models';

export class TooltipStateStore {
	@observable private visible: boolean = false;
    @observable private position?: Models.TooltipPositions;
    @observable private content?: React.ReactNode;
    @observable private node?: HTMLElement;
    @observable private outCallback?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;

	@action.bound
	public show(position: Models.TooltipPositions, content: React.ReactNode, hostNode: HTMLElement, mouseOutCallback?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void) {
        this.visible = true;
        this.position = position;
        this.content = content;
        this.node = hostNode;
        this.outCallback = mouseOutCallback;
    }

    @action.bound
    public hide() {
        this.visible = false;
        this.position = undefined;
        this.content = undefined;
    }

    public get isVisible() {
        return this.visible;
    }

    public get tooltipPosition() {
        return this.position;
    }

    public get tooltipContent() {
        return this.content;
    }

    public get hostNode() {
        return this.node;
    }

    public get mouseOutCallback() {
        return this.outCallback;
    }
}