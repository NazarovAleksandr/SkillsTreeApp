import './userSkills.scss'
import * as React from 'react';
import { observer } from "mobx-react";
import { observable } from "mobx";
import MagicSchools from '../components/magicSchools/magicSchools';
import SkillsTree from '../components/skillsTree/skillsTree';
import RunesList from '../components/runes/runesList';
import * as Models from '../components/magicSchools/models';
import {IUserSkillsPageProps} from './models';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import * as utils from './../utils';



@observer
export class UserSkillsPage extends React.PureComponent<IUserSkillsPageProps> {
    @observable
    public activeSchool: Models.IMagicSchool;

    public componentDidMount() {
        this.setActiveSchool(this.props.uiStateStore.getSelectedSchoolId());
    }

    private setActiveSchool = (schoolId: string) => {
        this.activeSchool = this.props.magicSchoolsStore.getSchool(schoolId);
    }

    public onRuneDropped = (result: DropResult) => {
        const { source, destination } = result;
        if (source && destination) {
            let rune = this.props.runesStore.getRune(source.droppableId);
            let node = this.props.skillTreesStore.getNode(destination.droppableId);
    
            if (rune && node) {
                node.attachedRune = rune;
                navigator.vibrate && navigator.vibrate([100]);
            }
        }
        document.body.classList.remove(utils.constants.dragInProgress);
    }

    public onDragStart() {
        document.body.classList.add(utils.constants.dragInProgress);
        navigator.vibrate && navigator.vibrate([100]);
    }

    public render() {
        let {magicSchoolsStore, uiStateStore, skillTreesStore, runesStore} = this.props;
        return (
            <div className="user-skills-page">
                <MagicSchools schoolsStore={magicSchoolsStore} uiStateStore={uiStateStore}></MagicSchools>
                <DragDropContext onDragEnd={this.onRuneDropped} onDragStart={this.onDragStart}>
                    <SkillsTree relatedSchoolId={uiStateStore.getSelectedSchoolId()} treeStore={skillTreesStore}></SkillsTree>
                    <RunesList runesStore={runesStore} usedRunes={skillTreesStore.attachedRunes}></RunesList>
                </DragDropContext>
            </div>
        );
        
    }
}