import * as Models from '../components/runes/models';

export function loadRunes(): Models.IRune[] {
    return [{
        id: '1',
        type: Models.RuneTypes.attack,
        rarity: Models.Rarity.common,
        image: '/images/precision/1.png',
        properties: [
            {name: Models.RunePropertyTypes.Power, value: 10}
        ]
    }, {
        id: '2',
        type: Models.RuneTypes.utility,
        rarity: Models.Rarity.rare,
        image: '/images/inspiration/1.png',
        properties: [
            {name: Models.RunePropertyTypes.Hp, value: 27},
            {name: Models.RunePropertyTypes.Mp, value: 40},
        ]
    }, {
        id: '3',
        type: Models.RuneTypes.defence,
        rarity: Models.Rarity.unique,
        image: '/images/domination/1.png',
        properties: [
            {name: Models.RunePropertyTypes.Shield, value: 33},
            {name: Models.RunePropertyTypes.Evade, value: 17},
            {name: Models.RunePropertyTypes.Hp, value: -44}
        ]
    }];
}