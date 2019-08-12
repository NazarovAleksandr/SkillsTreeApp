import * as React from 'react';
import * as Models from './models';
import { observer } from 'mobx-react';
import MagicSchool from './MagicSchool';
import './styles.scss';

@observer
export class MagicSchools extends React.PureComponent<Models.IMagicSchoolListProps> {
    public addNewItem = () => {
        let newSchool = this.props.schoolsStore.generateSchool();
        this.props.schoolsStore.addSchool(newSchool);
        this.selectItem(newSchool.id);
        this.props.uiStateStore.startSchoolEdition();
    }

    public startEdition = () => {
        this.props.uiStateStore.startSchoolEdition();
    }

    public onEditionEnd = (school: Models.IMagicSchool, newName: string) => {
        let trimmedName = newName.trim();
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
        let togglableButtonsClass = `action${this.props.uiStateStore.getSelectedSchoolId() ? '' : ' disabled'}`;

        return (
            <div className="schools-block">
                <div className="block-title">
                    <span className="title">Magic Pages</span>
                </div>
                <div className="schools-list">
                    {this.props.schoolsStore.getSchools().map((school, idx) => {
                        let isActive = this.props.uiStateStore.getSelectedSchoolId() === school.id;
                        let inEdition = this.props.uiStateStore.isInEditionState() && this.props.uiStateStore.getSelectedSchoolId() === school.id;
                        return (
                            <MagicSchool
                                key={idx}
                                school={school}
                                inEdition={inEdition}
                                isActive={isActive}
                                onEditionEnd={(e) => this.onEditionEnd(school, e.target.value)}
                                onSelect={() => this.selectItem(school.id)}
                            ></MagicSchool>
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
