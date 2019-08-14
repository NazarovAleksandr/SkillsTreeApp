import * as Models from '../components/runes/models';
import * as utils from '../utils';

export function loadRunes(): Models.IRune[] {
    return [{
        id: '1',
        type: Models.RuneTypes.attack,
        rarity: Models.Rarity.common,
        image: utils.images.precision[0],
        properties: [
            { name: Models.RunePropertyTypes.Power, value: 10 },
        ],
    }, {
        id: '2',
        type: Models.RuneTypes.utility,
        rarity: Models.Rarity.rare,
        image: utils.images.inspiration[0],
        properties: [
            { name: Models.RunePropertyTypes.Hp, value: 27 },
            { name: Models.RunePropertyTypes.Mp, value: 40 },
        ],
    }, {
        id: '3',
        type: Models.RuneTypes.defence,
        rarity: Models.Rarity.unique,
        image: utils.images.domination[0],
        properties: [
            { name: Models.RunePropertyTypes.Shield, value: 33 },
            { name: Models.RunePropertyTypes.Evade, value: 17 },
            { name: Models.RunePropertyTypes.Hp, value: -44 },
        ],
    }];
}
