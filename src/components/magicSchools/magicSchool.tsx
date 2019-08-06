import * as React from 'react';
import * as Models from './models';
import { observer } from "mobx-react";

const MagicSchool = (props: Models.IMagicSchoolProps) => {
    let {school, inEdition, isActive, onEditionEnd, onSelect} = props;

    let activeDisplay = <div className="active-container"><input className="input" defaultValue={school.name} autoFocus={true} onBlur={onEditionEnd}/></div>;
    let passiveDisplay = <span className="title" title={school.name}>{school.name}</span>
    
    let className = `school${isActive ? ' active' : ''}`;
    return (
        <div className={className} onClick={onSelect}>
            {
                inEdition ? activeDisplay : passiveDisplay
            }
        </div>
    );
}

export default observer(MagicSchool);
