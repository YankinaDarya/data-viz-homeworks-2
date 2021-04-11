export const xmlFormatter = (xml: any) => {
    const convert = require('xml-js');
    const json = convert.xml2json(xml, {compact: true});
    const formattedResponse = JSON.parse(json);
    const edges = formattedResponse.graphml.graph.edge;
    const nodes = formattedResponse.graphml.graph.node;
    const parents = {};
    const children = {};
    const vertexesDict = {};
    edges.forEach(({_attributes: {source, target}}) => {
        if(parents[target]) {
            parents[target].push(source);
        } else {
            parents[target] = [source];
        }
        if(children[source]) {
            children[source].push(target);
        } else {
            children[source] = [target];
        }
    });
    nodes.forEach(({_attributes: {id}}) => {
        vertexesDict[id] = -1;
    });
    return {children, parents, vertexesDict};
};