type PropsType = {
    parentsNames: Array<string>;
    childrenDict: { [key: string]: Array<string> };
    parentsDict: { [key: string]: Array<string> };
    vertexesDict: { [key: string]: number };
    counter: number;
};

export const markVertexes = ({parentsNames, childrenDict, vertexesDict, parentsDict, counter}: PropsType) => {
    // собираем всех детей у родителей:
    const childrenArray = [];
    parentsNames.forEach(parentName => {
        if (childrenDict[parentName]) {
            childrenDict[parentName].forEach(child => {
                if(!childrenArray.includes(child)) {
                    childrenArray.push(child);
                }
            })
        }
    });

    const candidatesToSort = [];

    // ищем детей, которым можно присвоить номер
    childrenArray.forEach(childrenName => {
        if (parentsDict[childrenName]) {
            const areAllParentsMarked = parentsDict[childrenName].findIndex((vertexName) => vertexesDict[vertexName] === -1);
            // если у ребенка все родители помечены:
            if (areAllParentsMarked === -1) {
                candidatesToSort.push(childrenName);
            }
        }
    });
    const listsOfParents = [];
    // собираем множества родителей:
    candidatesToSort.forEach(childrenName => {
        const parents = parentsDict[childrenName];
        if (parents) {
            const sortedParents = parents.sort((a, b) => {
                if (vertexesDict[a] < vertexesDict[b]) {
                    return -1;
                }
                if (vertexesDict[a] > vertexesDict[b]) {
                    return 1;
                }
                return 0;
            });
            listsOfParents.push({childrenName, sortedParents});
        }
    });

    listsOfParents.sort((a, b) => {
        const length = a.sortedParents.length < b.sortedParents.length ? a.sortedParents.length : b.sortedParents.length;
        let res = 0;
        for (let i = 0; i < length; i++) {
            if (vertexesDict[a.sortedParents[i]] < vertexesDict[b.sortedParents[i]]) {
                res = -1;
                break;
            }
            if (vertexesDict[a.sortedParents[i]] > vertexesDict[b.sortedParents[i]]) {
                res = 1;
                break;
            }
        }
        return res;
    });
    // нумеруем вершины:
    listsOfParents.forEach(({childrenName}) => {
        vertexesDict[childrenName] = counter;
        counter += 1;
    });

    const newParents = listsOfParents.map(({childrenName}) => childrenName);

    const unlabeledVertexIndex = Object.values(vertexesDict).findIndex(vertNumber => vertNumber === -1);
    if (unlabeledVertexIndex !== -1) {
        markVertexes({parentsNames: newParents, childrenDict, vertexesDict, parentsDict, counter});
    }
    return vertexesDict;
}