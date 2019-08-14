import * as React from 'react';
import { observer } from 'mobx-react';
import * as Models from './models';

const MagicSchool = (props: Models.IMagicSchoolProps) => {
    const {
        school, inEdition, isActive, onEditionEnd, onSelect,
    } = props;

    const activeDisplay = <div className="active-container"><input className="input" defaultValue={school.name} autoFocus onBlur={onEditionEnd} /></div>;
    const passiveDisplay = <span className="title" title={school.name}>{school.name}</span>;

    const className = `school${isActive ? ' active' : ''}`;
    return (
        <div className={className} onClick={onSelect}>
            {
                inEdition ? activeDisplay : passiveDisplay
            }
        </div>
    );
};

export default observer(MagicSchool);
