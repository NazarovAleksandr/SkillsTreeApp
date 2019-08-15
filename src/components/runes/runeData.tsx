import * as React from 'react';
import { observer } from 'mobx-react';
import * as Models from './models';

const RuneData = observer((props: Models.IRuneDataProps) => {
    const { rune } = props;
    let rarityClassName = 'rune-rarity ';
    switch (rune.rarity) {
    case 'Common':
        rarityClassName += 'common';
        break;
    case 'Rare':
        rarityClassName += 'rare';
        break;
    case 'Unique':
        rarityClassName += 'unique';
        break;
    default:
        break;
    }

    return (
        <div className="rune-data-container">
            <div className="main-data">
                <div>
                    <span className="title">Type:</span>
                    {' '}
                    {rune.type}
                </div>
                <div>
                    <span className="title">Rarity:</span>
                    {' '}
                    <span className={rarityClassName}>{rune.rarity}</span>
                </div>
            </div>
            {rune.properties.map((prop) => {
                const isPositive = prop.value > 0;
                const valueClassName = `property-value ${isPositive ? 'positive' : 'negative'}`;
                const value = isPositive ? `+${prop.value}` : prop.value;
                return (
                    <div key={prop.name + prop.value}>
                        <span className="title">
                            {prop.name}
                        :
                        </span>
                        {' '}
                        <span className={valueClassName}>{value}</span>
                    </div>
                );
            })}
        </div>
    );
});

export default RuneData;
