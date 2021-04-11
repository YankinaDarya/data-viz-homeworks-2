type PropsType = {
    vertexesDict: { [key: string]: number };
    maxWidth: number;
    childrenDict: { [key: string]: Array<string> };
    parentsDict: { [key: string]: Array<string> };
};

type TmpPropsType = {
    sortedVertexes: Array<string>;
    maxWidth: number;
    childrenDict: { [key: string]: Array<string> };
    parentsDict: { [key: string]: Array<string> };
    usedVertexesDict: { [key: string]: boolean };
    layersArray: Array<Array<string>>;
    currentLayer: number;
    unusedVertexesNumber: number;
};

const tmp = ({
                 sortedVertexes,
                 childrenDict,
                 usedVertexesDict,
                 layersArray,
                 currentLayer,
                 parentsDict,
                 maxWidth,
                 unusedVertexesNumber
             }: TmpPropsType) => {
    sortedVertexes.forEach((vertex) => {
        const childrenArray = childrenDict[vertex];
        const unusedChildrenIndex = childrenArray ? childrenArray.findIndex((vertexName) => !usedVertexesDict[vertexName]) : -1;

        // флаг того, что дети не лежат в слое
        const flag = !layersArray[currentLayer].some((parentVertex) => parentsDict[parentVertex] && parentsDict[parentVertex].includes(vertex));
        // если все дети отрисованы и есть место в слое, и родитель не лежит в этом слое, добавляем вершину:
        if (unusedChildrenIndex === -1 &&
            layersArray[currentLayer].length < maxWidth &&
            flag && !usedVertexesDict[vertex]
        ) {
            layersArray[currentLayer].push(vertex);
            usedVertexesDict[vertex] = true;
            unusedVertexesNumber -= 1;
        }
        // если все дети отрисованы, но место в слое закончилось, или в слое уже лежат дети вершины,
        // создаем новый слой и добавляем в него:
        else if ((unusedChildrenIndex === -1 &&
            layersArray[currentLayer].length >= maxWidth
            && !usedVertexesDict[vertex]) || !flag) {
            currentLayer += 1;
            layersArray.push([]);
            layersArray[currentLayer].push(vertex);
            unusedVertexesNumber -= 1;
            usedVertexesDict[vertex] = true;
        }
    });
    if (unusedVertexesNumber > 0) {
        tmp({
            sortedVertexes,
            childrenDict,
            usedVertexesDict,
            layersArray,
            currentLayer,
            parentsDict,
            maxWidth,
            unusedVertexesNumber
        });
    } else {
        return layersArray;
    }
};

export const makeLayers = ({vertexesDict, childrenDict, parentsDict, maxWidth}: PropsType) => {
    let currentLayer = 0;
    const layersArray: Array<Array<string>> = [[]];
    const sortedVertexes = Object.keys({...vertexesDict}).sort((a, b) => {
        if (vertexesDict[a] < vertexesDict[b]) {
            return 1;
        }
        if (vertexesDict[a] > vertexesDict[b]) {
            return -1;
        }
        return 0;
    });
    const usedVertexesDict: { [key: string]: boolean } = {};
    Object.keys({...vertexesDict}).forEach(vertexName => {
        usedVertexesDict[vertexName] = false;
    });
    let unusedVertexesNumber = sortedVertexes.length;
    const layers = tmp({sortedVertexes,
        childrenDict,
        usedVertexesDict,
        layersArray,
        currentLayer,
        parentsDict,
        maxWidth,
        unusedVertexesNumber})
    return layers;
};