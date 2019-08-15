import './userSkills.scss';
import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { MagicSchools } from '../components/magicSchools/magicSchools';
import SkillsTree from '../components/skillsTree/skillsTree';
import { RunesList } from '../components/runes/runesList';
import * as Models from '../components/magicSchools/models';
import { IUserSkillsPageProps } from './models';
import * as utils from '../utils';


@observer
export class UserSkillsPage extends React.PureComponent<IUserSkillsPageProps> {
    @observable
    public activeSchool: Models.IMagicSchool;

    public componentDidMount() {
        const { uiStateStore } = this.props;
        this.setActiveSchool(uiStateStore.getSelectedSchoolId());
    }

    public onRuneDropped = (result: DropResult) => {
        const { source, destination } = result;
        if (source && destination) {
            const { runesStore, skillTreesStore } = this.props;
            const rune = runesStore.getRune(source.droppableId);
            const node = skillTreesStore.getNode(destination.droppableId);

            if (rune && node) {
                node.attachedRune = rune;
                if (navigator.vibrate) {
                    navigator.vibrate([100]);
                }
            }
        }
        document.body.classList.remove(utils.constants.dragInProgress);
    }

    public onDragStart = () => {
        document.body.classList.add(utils.constants.dragInProgress);
        if (navigator.vibrate) {
            navigator.vibrate([100]);
        }
    }

    private setActiveSchool = (schoolId: string) => {
        const { magicSchoolsStore } = this.props;
        this.activeSchool = magicSchoolsStore.getSchool(schoolId);
    }

    public render() {
        const {
            magicSchoolsStore, uiStateStore, skillTreesStore, runesStore,
        } = this.props;
        return (
            <div className="user-skills-page">
                <MagicSchools schoolsStore={magicSchoolsStore} uiStateStore={uiStateStore} />
                <DragDropContext onDragEnd={this.onRuneDropped} onDragStart={this.onDragStart}>
                    <SkillsTree relatedSchoolId={uiStateStore.getSelectedSchoolId()} treeStore={skillTreesStore} />
                    <RunesList runesStore={runesStore} usedRunes={skillTreesStore.attachedRunes} />
                </DragDropContext>
            </div>
        );
    }
}
