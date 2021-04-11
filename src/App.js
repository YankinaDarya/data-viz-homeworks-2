import React, {useState} from 'react';
import './App.css';
import {vertexesSort} from "./_utils/vertexes-sort";
import {makeLayers} from "./_utils/make-layers";
import {xmlFormatter} from "./_utils/xml-formatter";
import {MyGraph} from "./graph";
import {dataFormatter} from "./_utils/data-formatter";

function App() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const onButtonClick = () => {
       const {children, parents, vertexesDict} = xmlFormatter(document.getElementById("textarea").value);
       const maxWidth = document.getElementById("input").value;
        const markedVertexes = vertexesSort({
            parentsDict: parents,
            childrenDict: children,
            vertexesDict: vertexesDict
        });
        console.log("markedVertexes ", markedVertexes);
        const layers = makeLayers({
            vertexesDict: markedVertexes,
            childrenDict: children,
            maxWidth: maxWidth || 3,
            parentsDict: parents
        });

        const {newNodes, newEdges} = dataFormatter({layers, children: children});

        setNodes(newNodes);
        setEdges(newEdges);
    };

    return (
        <div style={{display: 'flex'}}>
            <textarea name="textarea" id="textarea"
                      cols="30" rows="10" placeholder="Введите данные в формате xml,
                      нажмите на кнопку Построить граф,
                      затем на рамку рядом со шкалой масштаба, чтобы увидеть построенный граф"/>
            <div style={{display: 'flex'}}>
                <input style={{height: '30px', alignSelf: 'flex-end', marginBottom: '10px'}} type="text" id="input"
                       placeholder="max-width"/>
                <button onClick={onButtonClick}
                        style={{height: '70px', alignSelf: 'flex-end', marginBottom: '10px', cursor: 'pointer'}}>
                    Построить граф
                </button>
            </div>
            <MyGraph data={{nodes, edges}}/>
        </div>
    );
}

export default App;
