import * as React from 'react';
import { observer } from 'mobx-react';
import * as Models from './models';
import MagicSchool from './magicSchool';
import './styles.scss';

@observer
export class MagicSchools extends React.PureComponent<Models.IMagicSchoolListProps> {
    public addNewItem = () => {
        const newSchool = this.props.schoolsStore.generateSchool();
        this.props.schoolsStore.addSchool(newSchool);
        this.selectItem(newSchool.id);
        this.props.uiStateStore.startSchoolEdition();
    }

    public startEdition = () => {
        this.props.uiStateStore.startSchoolEdition();
    }

    public onEditionEnd = (school: Models.IMagicSchool, newName: string) => {
        const trimmedName = newName.trim();
        if (trimmedName) {
            this.props.uiStateStore.endSchoolEdition();
            school.name = trimmedName;
        }
    }

    public deleteItem = () => {
        this.props.schoolsStore.removeSchool(this.props.uiStateStore.getSelectedSchoolId());
        this.props.uiStateStore.deselectSchool();
    }

    public selectItem = (schoolId: string) => {
        if (this.props.uiStateStore.getSelectedSchoolId() !== schoolId) {
            this.props.uiStateStore.setActiveSchool(schoolId);
        }
    }

    public render() {
        const togglableButtonsClass = `action${this.props.uiStateStore.getSelectedSchoolId() ? '' : ' disabled'}`;

        return (
            <div className="schools-block">
                <div className="block-title">
                    <span className="title">Magic Pages</span>
                </div>
                <div className="schools-list">
                    {this.props.schoolsStore.getSchools().map((school, idx) => {
                        const isActive = this.props.uiStateStore.getSelectedSchoolId() === school.id;
                        const inEdition = this.props.uiStateStore.isInEditionState() && this.props.uiStateStore.getSelectedSchoolId() === school.id;
                        return (
                            <MagicSchool
                                key={idx}
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
                    <div className="action" onClick={this.addNewItem}>Add</div>
                    <div className={togglableButtonsClass} onClick={this.startEdition}>Edit</div>
                    <div className={togglableButtonsClass} onClick={this.deleteItem}>Delete</div>
                </div>
            </div>
        );
    }
}

export default MagicSchools;
