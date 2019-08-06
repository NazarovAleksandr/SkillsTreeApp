import * as React from 'react';
import * as Models from './models';
import { observer } from "mobx-react";

const Rune = observer((props: Models.IRuneProps) => {
    let {rune, isUsed} = props;
    let runeContainerClassName = `rune${isUsed ? ' used' : ''}`;

    return (
        <div className={runeContainerClassName}>
            <img className="rune-image" src={rune.image}></img>
        </div>
    );
});

export default Rune;