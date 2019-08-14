import { observable, action, IObservableArray } from 'mobx';
import * as Models from '../components/magicSchools/models';
import * as utils from '../utils';

export class MagicSchoolsStore {
    private schools: IObservableArray<Models.IMagicSchool> = observable([]);

	@action.bound
    addSchool(school: Models.IMagicSchool) {
        this.schools.push(school);
    }

	generateSchool(name = 'New School') {
	    return {
	        id: utils.uids.getUID(),
	        name,
	    };
	}

	@action.bound
	removeSchool(schoolId: string) {
	    const idx = this.schools.findIndex((school) => school.id === schoolId);
	    if (idx > -1) {
	        this.schools.splice(idx, 1);
	    }
	}

	getSchools() {
	    return this.schools;
	}

	getSchool(id: string) {
	    return this.schools.find((school) => school.id === id);
	}
}

export class MagicSchoolsUIStateStore {
	@observable private selectedSchoolId?: string;

	@observable private inEditionState: boolean;

	@action.bound
	setActiveSchool(schoolId: string) {
	    this.endSchoolEdition();
	    this.selectedSchoolId = schoolId;
	}

	@action.bound
	startSchoolEdition() {
	    if (this.selectedSchoolId) {
	        this.inEditionState = true;
	    }
	}

	@action.bound
	endSchoolEdition() {
	    this.inEditionState = false;
	}

	@action.bound
	deselectSchool() {
	    this.selectedSchoolId = undefined;
	    this.endSchoolEdition();
	}

	getSelectedSchoolId() {
	    return this.selectedSchoolId;
	}

	isInEditionState() {
	    return this.inEditionState;
	}
}
