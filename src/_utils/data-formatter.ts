type PropsType = {
    layers: Array<Array<string>>;
    children: { [key: string]: Array<string> };
};

export const dataFormatter = ({layers, children}: PropsType) => {
    console.log(layers);
    const newNodes = [];
    const newEdges = [];
    layers.forEach((layer, indexY) => {
        layer.forEach((vertex, indexX) => {
            newNodes.push({x: indexX * 100, y: -indexY * 100, id: vertex, title: vertex, type: 'empty'});
        })
    });
    Object.keys(children).forEach((vertex) => {
        children[vertex].forEach(child => {
            newEdges.push({ source: vertex, target: child, type: "emptyEdge" })
        });
    })
    return {newNodes, newEdges}
};