import { Graph } from "../graph.js";

function addNode(x, y, graph) {
    graph.createNode(x, y)
}

it('Create Node', () => {
    const testGraph = new Graph();
    addNode({x: 150, y: 150}, {x: 250, y: 250}, testGraph);
    expect(testGraph.nodes.length).toBe(2);
});

it('Create 3 Nodes, first one having 3 arcs to the other ones', () => {
    const testGraph = new Graph();
    addNode({x: 150, y: 150}, {x: 250, y: 250}, testGraph);
    addNode({x: 150, y: 150}, {x: 100, y: 100}, testGraph);
    addNode({x: 150, y: 150}, {x: 50, y: 50}, testGraph);
    expect(Object.keys(testGraph.arcs['x150:y150']).length).toBe(3);
});

it('Create 3 Nodes, first one having 3 arcs to the other ones', () => {
    const testGraph = new Graph();
    addNode({x: 150, y: 150}, {x: 250, y: 250}, testGraph);
    addNode({x: 150, y: 150}, {x: 100, y: 100}, testGraph);
    addNode({x: 150, y: 150}, {x: 50, y: 50}, testGraph);
    expect(Object.keys(testGraph.arcs['x150:y150']).length).toBe(3);
});

it('Graph must start with one node', () => {
    const testGraph = new Graph();
    expect(testGraph.nodes.length).toBe(1);
});