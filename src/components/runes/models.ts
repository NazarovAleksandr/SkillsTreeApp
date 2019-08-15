import { ReactNode } from 'react';

export interface IProperty {
    name: RunePropertyTypes;
    value: number;
}

export enum RuneTypes {
    attack = 'Attack',
    defence = 'Defence',
    utility = 'Utility',
    magic = 'Magic',
    heal = 'Heal'
}

export enum Rarity {
    common = 'Common',
    rare = 'Rare',
    unique = 'Unique'
}

export interface IRune {
    id: string;
    rarity: Rarity;
    properties: IProperty[];
    type: RuneTypes;
    image: string;
}

export interface IRuneProps {
    rune: IRune;
    isUsed: boolean;
}

export interface IRuneDataProps {
    rune: IRune;
}

export enum RunePropertyTypes {
    Hp = 'Health',
    Mp = 'Mana',
    Power = 'Power',
    Shield = 'Shield',
    Evade = 'Evade'
}

export interface IDraggableContainerProps {
    children: ReactNode;
    droppableId: string;
    draggableId: string;
    index: number;
}
