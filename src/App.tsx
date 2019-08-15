import * as React from 'react';
import './App.scss';
import './common.scss';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { observe } from 'mobx';
import AboutPage from './pages/about';
import { UserSkillsPage } from './pages/userSkills';
import { TooltipContext } from './contexts/tooltip';
import * as stores from './stores';
import { Tooltip } from './components/tooltip/tooltip';
import * as schoolsService from './services/schoolsService';
import * as treeService from './services/skillTreesService';
import * as runeService from './services/runeService';

const tooltipStateStore = new stores.tooltipState.TooltipStateStore();
const basename = process.env.BASENAME || '/';

window.addEventListener('scroll', () => {
    tooltipStateStore.hide();
}, {
    capture: true,
    passive: true,
});

const magicSchoolsStore = new stores.magicSchools.MagicSchoolsStore();
const skillTreesStore = new stores.skillTrees.SkillTreesStore();
const uiStateStore = new stores.magicSchools.MagicSchoolsUIStateStore();
const runesStore = new stores.runes.RunesStore();

const schools = schoolsService.loadSchools();
const treeData = treeService.loadTreesData();
const runes = runeService.loadRunes();

schools.forEach((school) => {
    magicSchoolsStore.addSchool(school);
});
treeData.forEach((item) => {
    skillTreesStore.addTree(item.parentSchoolId, item.tree);
});
runes.forEach((rune) => {
    runesStore.addRune(rune);
});

const tree = skillTreesStore.getTree('1');
tree.children[0].children.forEach((child, idx) => {
    child.attachedRune = runesStore.getRunes()[idx];
});

for (let i = 0; i < 22; i += 1) {
    runesStore.addRune(runesStore.generateRune());
}

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

const App = () => (
    <Router basename={basename}>
        <TooltipContext.Provider value={tooltipStateStore}>
            <div className="App">
                <div className="layout">
                    <div className="menu">
                        <NavLink exact to="/" activeClassName="active">About</NavLink>
                        <NavLink to="/skills" activeClassName="active">Skills</NavLink>
                    </div>
                    <div className="pages">
                        <Route
                            path="/skills"
                            render={(props) => (
                                <UserSkillsPage
                                    {...props}
                                    magicSchoolsStore={magicSchoolsStore}
                                    skillTreesStore={skillTreesStore}
                                    uiStateStore={uiStateStore}
                                    runesStore={runesStore}
                                />
                            )}
                        />
                        <Route exact path="/" component={AboutPage} />
                    </div>
                </div>
            </div>
        </TooltipContext.Provider>
        <Tooltip
            position={tooltipStateStore.tooltipPosition}
            content={tooltipStateStore.tooltipContent}
            node={tooltipStateStore.hostNode}
            visible={tooltipStateStore.isVisible}
            mouseOutCallback={tooltipStateStore.mouseOutCallback}
        />
    </Router>
);

export default observer(App);

/*

TODO

1) Рефакторинг

*/
