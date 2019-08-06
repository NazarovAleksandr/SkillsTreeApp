import * as Models from '../components/tree/models';

let fireTree: Models.ITreeNode = {
    id: 'Fire Root',
    isRoot: true,
    children: [{
        id: 'First child',
        children: [
            {
                id: 'Child 1-1',
                children: [
                    {
                        id: 'Child 1-1-1'
                    },
                    {id: 'Child 1-1-2'}  
                ]
            },
            {id: 'Child 1-2'},
            {id: 'Child 1-3'}
        ]
    }]
};

let windTree: Models.ITreeNode = {
    id: 'Wind Root',
    isRoot: true
};

export function loadTreesData() {
    return [{
        parentSchoolId: '1',
        tree: fireTree
    }, {
        parentSchoolId: '2',
        tree: windTree
    }];
}