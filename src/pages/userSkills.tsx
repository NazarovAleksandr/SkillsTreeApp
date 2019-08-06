import './userSkills.scss'
import * as React from 'react';
import { observer } from "mobx-react";
import { observable, observe } from "mobx";
import MagicSchools from '../components/magicSchools/magicSchools';
import SkillsTree from '../components/skillsTree/skillsTree';
import RunesList from '../components/runes/runesList';
import * as schoolsService from '../services/schoolsService';
import * as treeService from '../services/skillTreesService';
import * as runeService from '../services/runeService';
import * as Models from '../components/magicSchools/models';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import * as stores from '../stores';
import * as utils from './../utils';

const magicSchoolsStore = new stores.magicSchools.MagicSchoolsStore();
const skillTreesStore = new stores.skillTrees.SkillTreesStore();
const uiStateStore = new stores.magicSchools.MagicSchoolsUIStateStore();
const runesStore = new stores.runes.RunesStore();

@observer
class UserSkillsPage extends React.PureComponent {
    @observable
    public activeSchool: Models.IMagicSchool;

    public componentDidMount() {
        if (magicSchoolsStore.getSchools().length === 0) {
            this.loadInitialData();
            this.setBusinessLogic();
        }
        
        this.setActiveSchool(uiStateStore.getSelectedSchoolId());
    }

    private loadInitialData() {
        let schools = schoolsService.loadSchools();
        let treeData = treeService.loadTreesData();
        let runes = runeService.loadRunes();
        
        schools.forEach((school) => {
            magicSchoolsStore.addSchool(school);
        });
        treeData.forEach((item) => {
            skillTreesStore.addTree(item.parentSchoolId, item.tree);
        });
        runes.forEach((rune) => {
            runesStore.addRune(rune);
        });

        let tree = skillTreesStore.getTree('1');
        tree.children[0].children.forEach((child, idx) => {
            child.attachedRune = runesStore.getRunes()[idx];
        });

        for (let i = 0; i < 22; i++) {
            runesStore.addRune(runesStore.generateRune());
        }
    }

    private setActiveSchool(schoolId: string) {
        this.activeSchool = magicSchoolsStore.getSchool(schoolId);
    }

    private setBusinessLogic() {
        observe(magicSchoolsStore.getSchools(), (changes) => {
            if (changes.type === 'splice') {
                changes.added.forEach((addedSchool) => {
                    skillTreesStore.createTree(addedSchool.id, true);
                });
                changes.removed.forEach((removedSchool) => {
                    skillTreesStore.removeTree(removedSchool.id);
                });
            }
        });
    }

    private onRuneDropped(result: DropResult) {
        const { source, destination } = result;
        if (source && destination) {
            let rune = runesStore.getRune(source.droppableId);
            let node = skillTreesStore.getNode(destination.droppableId);
    
            if (rune && node) {
                node.attachedRune = rune;
            }
        }
        document.body.classList.remove(utils.constants.dragInProgress);
    }

    private onDragStart() {
        document.body.classList.add(utils.constants.dragInProgress);
    }

    public render() {
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

export default observer(UserSkillsPage);