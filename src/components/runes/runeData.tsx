import * as React from 'react';
import * as Models from './models';
import { observer } from "mobx-react";

const RuneData = observer((props: Models.IRuneDataProps) => {
    let {rune} = props;
    let rarityClassName = 'rune-rarity ';
    switch(rune.rarity) {
        case 'Common':
            rarityClassName += 'common';
            break;
        case 'Rare':
                rarityClassName += 'rare';
            break;
        case 'Unique':
                rarityClassName += 'unique';
            break;
    }

    return (
        <div className="rune-data-container">
            <div className="main-data">
                <div><span className="title">Type:</span> {rune.type}</div>
                <div><span className="title">Rarity:</span> <span className={rarityClassName}>{rune.rarity}</span></div>
            </div>
            {rune.properties.map((prop, idx) => {
                let isPositive = prop.value > 0;
                let valueClassName = `property-value ${isPositive ? 'positive' : 'negative'}`
                let value = isPositive ? `+${prop.value}` : prop.value
                return (
                    <div key={idx}><span className="title">{prop.name}:</span> <span className={valueClassName}>{value}</span></div>
                );
            })}
        </div>
    );
});

export default RuneData;