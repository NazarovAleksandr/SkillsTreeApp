import * as React from 'react';
import { observer } from 'mobx-react';
import * as Models from './models';

const Rune = observer((props: Models.IRuneProps) => {
    const { rune, isUsed } = props;
    const runeContainerClassName = `rune${isUsed ? ' used' : ''}`;

    return (
        <div className={runeContainerClassName}>
            <img className="rune-image" src={rune.image} />
        </div>
    );
});

export default Rune;
