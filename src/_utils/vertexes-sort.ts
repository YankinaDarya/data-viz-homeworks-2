import {markVertexes} from "./mark-vertexes";

type PropsType = {
    // словарь родителей у каждой вершины:
    parentsDict: { [key: string]: Array<string> };
    // словарь детей у каждой вершины:
    childrenDict: { [key: string]: Array<string> };
    // словарь имя вершины - ее номер (изначально сделать -1 всем):
    vertexesDict: { [key: string]: number };
};

export const vertexesSort = ({parentsDict, childrenDict, vertexesDict}: PropsType) => {
    let counter = 1;
    // начинаем с вершин без родителей:
    // все вершины, у которых есть родители:
    const parents = Object.keys(parentsDict);
    // массив вершин без родителей
    const initialVertexes = Object.keys(vertexesDict).filter((vertexName) => !parents.includes(vertexName));
    // помечаем вершины:
    initialVertexes.forEach(vertexName => {
        vertexesDict[vertexName] = counter;
        counter += 1;
    });
    const updatedVertexes = markVertexes({parentsNames: initialVertexes, vertexesDict, childrenDict, counter, parentsDict});
    return updatedVertexes;
};