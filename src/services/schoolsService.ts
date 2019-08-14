import * as Models from '../components/magicSchools/models';

export function loadSchools(): Models.IMagicSchool[] {
    return [{
        id: '1',
        name: 'Fire Magic page',
    }, {
        id: '2',
        name: 'My new runes',
    }];
}
