import {
    observable, action, IObservableArray,
} from 'mobx';
import * as Models from '../components/runes/models';
import * as utils from '../utils';

export class RunesStore {
    private runes: IObservableArray<Models.IRune> = observable([]);

    private runeRarities: Models.Rarity[] = [Models.Rarity.common, Models.Rarity.rare, Models.Rarity.unique];

    private runeTypes: Models.RuneTypes[] = [
        Models.RuneTypes.attack,
        Models.RuneTypes.defence,
        Models.RuneTypes.heal,
        Models.RuneTypes.magic,
        Models.RuneTypes.utility,
    ];

    private propertyTypes: Models.RunePropertyTypes[] = [
        Models.RunePropertyTypes.Evade,
        Models.RunePropertyTypes.Hp,
        Models.RunePropertyTypes.Mp,
        Models.RunePropertyTypes.Power,
        Models.RunePropertyTypes.Shield,
    ];

    @action.bound
    public addRune(rune: Models.IRune) {
        this.runes.push(rune);
    }

    public getRunes() {
        return this.runes;
    }

    public getRune(id: string) {
        return this.runes.find((rune) => rune.id === id);
    }

    public generateRune(): Models.IRune {
        const newRarity = this.getRandomEntity(this.runeRarities);
        const newType = this.getRandomEntity(this.runeTypes);

        let maxPropCount;
        let minPropCount;
        switch (newRarity) {
        case Models.Rarity.common:
            minPropCount = 1;
            maxPropCount = 1;
            break;
        case Models.Rarity.rare:
            minPropCount = 1;
            maxPropCount = 2;
            break;
        case Models.Rarity.unique:
            minPropCount = 2;
            maxPropCount = 4;
            break;
        default:
            minPropCount = 1;
            maxPropCount = 1;
            break;
        }

        return {
            id: utils.uids.getUID(),
            type: newType,
            rarity: newRarity,
            properties: this.generateProperties(minPropCount, maxPropCount),
            image: this.generateImage(newType),
        };
    }

    private generateImage = (type: Models.RuneTypes) => {
        let imgType = '';
        switch (type) {
        case Models.RuneTypes.attack:
            imgType = 'precision';
            break;
        case Models.RuneTypes.defence:
            imgType = 'domination';
            break;
        case Models.RuneTypes.heal:
            imgType = 'resolve';
            break;
        case Models.RuneTypes.magic:
            imgType = 'sorcery';
            break;
        case Models.RuneTypes.utility:
            imgType = 'inspiration';
            break;
        default:
            imgType = 'inspiration';
            break;
        }

        const typeImages = utils.images[imgType];
        const picNum = utils.randomizer.getRandomInt(0, typeImages.length - 1);

        return typeImages[picNum];
    }

    private generateProperties(minPropCount: number, maxPropCount: number) {
        const newProperties: Models.IProperty[] = [];
        for (let i = 0; i < minPropCount; i += 1) {
            newProperties.push({
                name: this.getRandomEntity(this.propertyTypes),
                value: utils.randomizer.getRandomInt(-100, 100),
            });
        }

        const randAdditionalPropCount = utils.randomizer.getRandomInt(0, maxPropCount - minPropCount);
        for (let i = 0; i < randAdditionalPropCount; i += 1) {
            newProperties.push({
                name: this.getRandomEntity(this.propertyTypes),
                value: utils.randomizer.getRandomInt(-100, 100),
            });
        }

        return newProperties;
    }

    private getRandomEntity = <T>(list: T[]) => list[utils.randomizer.getRandomInt(0, list.length - 1)];
}
