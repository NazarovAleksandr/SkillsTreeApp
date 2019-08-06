import { observable, action, computed, IObservableArray } from "mobx";
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
        Models.RuneTypes.utility
    ];
    private propTypes: Models.RunePropertyTypes[] = [
        Models.RunePropertyTypes.Evade,
        Models.RunePropertyTypes.Hp,
        Models.RunePropertyTypes.Mp,
        Models.RunePropertyTypes.Power,
        Models.RunePropertyTypes.Shield
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
        let newRarity = this.getRandomEntity(this.runeRarities);
        let newType = this.getRandomEntity(this.runeTypes);

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
        }

        return {
            id: utils.uids.getUID(),
            type: newType,
            rarity: newRarity,
            properties: this.generateProperties(minPropCount, maxPropCount),
            image: this.generateImage(newType)
        }
    }

    private generateImage(type: Models.RuneTypes) {
        let imgUrl = '/images/';
        let imagesCount = 0;
        switch(type) {
            case Models.RuneTypes.attack:
                imgUrl += 'precision';
                imagesCount = 13;
            break;
            case Models.RuneTypes.defence:
                imgUrl += 'domination';
                imagesCount = 10;
            break;
            case Models.RuneTypes.heal:
                imgUrl += 'resolve';
                imagesCount = 9;
            break;
            case Models.RuneTypes.magic:
                imgUrl += 'sorcery';
                imagesCount = 12;
            break;
            case Models.RuneTypes.utility:
                imgUrl += 'inspiration';
                imagesCount = 9;
            break;
        }

        let picNum = utils.randomizer.getRandomInt(1, imagesCount);
        imgUrl += `/${picNum}.png`;

        return imgUrl;
    }

    private generateProperties(minPropCount: number, maxPropCount: number) {
        let newProperties: Models.IProperty[] = [];
        for (let i = 0; i < minPropCount; i++) {
            newProperties.push({
                name: this.getRandomEntity(this.propTypes),
                value: utils.randomizer.getRandomInt(-100, 100)
            });
        }

        let randAdditionalPropCount = utils.randomizer.getRandomInt(0, maxPropCount - minPropCount);
        for (let i = 0; i < randAdditionalPropCount; i++) {
            newProperties.push({
                name: this.getRandomEntity(this.propTypes),
                value: utils.randomizer.getRandomInt(-100, 100)
            });
        }

        return newProperties;
    }

    private getRandomEntity<T>(list: T[]) {
        return list[utils.randomizer.getRandomInt(0, list.length - 1)]
    }
}