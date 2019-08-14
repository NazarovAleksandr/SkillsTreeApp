import { TooltipStateStore } from '../../src/stores/tooltipState';

describe('TooltipState store', () => {
    test('Sets observable properies', () => {
        const store = new TooltipStateStore();
        const content = '123';
        const hostNode = document.createElement('div');
        const mouseOutMock = () => {};
        store.show('top', content, hostNode, mouseOutMock);

        expect(store.hostNode).toBe(hostNode);
        expect(store.isVisible).toEqual(true);
        expect(store.mouseOutCallback).toEqual(mouseOutMock);
        expect(store.tooltipContent).toEqual(content);
        expect(store.tooltipPosition).toEqual('top');
    });
    test('Clears observable properies', () => {
        const store = new TooltipStateStore();
        const content = '123';
        const hostNode = document.createElement('div');
        const mouseOutMock = () => {};
        store.show('top', content, hostNode, mouseOutMock);
        store.hide();

        expect(store.hostNode).toBe(undefined);
        expect(store.isVisible).toEqual(false);
        expect(store.mouseOutCallback).toEqual(undefined);
        expect(store.tooltipContent).toEqual(undefined);
        expect(store.tooltipPosition).toEqual(undefined);
    });
});
