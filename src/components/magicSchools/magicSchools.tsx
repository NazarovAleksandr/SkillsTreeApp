import * as React from 'react';
import { observer } from 'mobx-react';
import * as Models from './models';
import MagicSchool from './magicSchool';
import './styles.scss';
import { MagicSchoolsUIStateStore, MagicSchoolsStore } from '../../stores/magicSchool';

interface IMagicSchoolListProps {
    schoolsStore: MagicSchoolsStore;
    uiStateStore: MagicSchoolsUIStateStore;
}

@observer
export class MagicSchools extends React.PureComponent<IMagicSchoolListProps> {
    public addNewItem = () => {
        const { schoolsStore, uiStateStore } = this.props;
        const newSchool = schoolsStore.generateSchool();
        schoolsStore.addSchool(newSchool);
        this.selectItem(newSchool.id);
        uiStateStore.startSchoolEdition();
    }

    public startEdition = () => {
        const { uiStateStore } = this.props;
        uiStateStore.startSchoolEdition();
    }

    public onEditionEnd = (school: Models.IMagicSchool, newName: string) => {
        const trimmedName = newName.trim();
        if (trimmedName) {
            const { uiStateStore } = this.props;
            uiStateStore.endSchoolEdition();
            school.name = trimmedName;
        }
    }

    public deleteItem = () => {
        const { schoolsStore, uiStateStore } = this.props;
        schoolsStore.removeSchool(uiStateStore.getSelectedSchoolId());
        uiStateStore.deselectSchool();
    }

    public selectItem = (schoolId: string) => {
        const { uiStateStore } = this.props;
        if (uiStateStore.getSelectedSchoolId() !== schoolId) {
            uiStateStore.setActiveSchool(schoolId);
        }
    }

    public render() {
        const { schoolsStore, uiStateStore } = this.props;
        const togglableButtonsClass = `action${uiStateStore.getSelectedSchoolId() ? '' : ' disabled'}`;

        return (
            <div className="schools-block">
                <div className="block-title">
                    <span className="title">Magic Pages</span>
                </div>
                <div className="schools-list">
                    {schoolsStore.getSchools().map((school) => {
                        const isActive = uiStateStore.getSelectedSchoolId() === school.id;
                        const inEdition = uiStateStore.isInEditionState() && uiStateStore.getSelectedSchoolId() === school.id;
                        return (
                            <MagicSchool
                                key={school.id}
                                school={school}
                                inEdition={inEdition}
                                isActive={isActive}
                                onEditionEnd={(e) => this.onEditionEnd(school, e.target.value)}
                                onSelect={() => this.selectItem(school.id)}
                            />
                        );
                    })}
                </div>
                <div className="actions-panel">
                    <div role="button" tabIndex={0} className="action" onClick={this.addNewItem}>Add</div>
                    <div role="button" tabIndex={0} className={togglableButtonsClass} onClick={this.startEdition}>Edit</div>
                    <div role="button" tabIndex={0} className={togglableButtonsClass} onClick={this.deleteItem}>Delete</div>
                </div>
            </div>
        );
    }
}

export default MagicSchools;
