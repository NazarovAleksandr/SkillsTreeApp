import * as React from 'react';
import './App.scss';
import './common.scss';
import { observer } from "mobx-react";
import AboutPage from './pages/about';
import UserSkillsPage from './pages/userSkills';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { TooltipContext } from './contexts/tooltip';
import * as stores from './stores';
import { Tooltip } from './components/tooltip/tooltip';

const tooltipStateStore = new stores.tooltipState.TooltipStateStore();
let basename = process.env.BASENAME || '/'

window.addEventListener('scroll', () => {
    tooltipStateStore.hide();
}, {
    capture: true,
    passive: true
});

const App = () => {
    return (
        <Router basename={basename}>
            <TooltipContext.Provider value={tooltipStateStore}>
                <div className="App">
                    <div className="layout">
                        <div className="menu">
                            <NavLink exact to="/" activeClassName='active'>About</NavLink>
                            <NavLink to="/skills" activeClassName='active'>Skills</NavLink>
                        </div>
                        <div className="pages">
                            <Route path="/skills" component={UserSkillsPage} />
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
}

export default observer(App);

/*

TODO

1) Рефакторинг

*/