import { assoc, curry, forEach, reduce } from "ramda";
import { getGraph, getGuide } from "./state.js";

export const Graph = function () {
  this.idSeq = 1;

  this.nodesDict = {
    /* "x150:y150": { x: 150, y: 150 }, */
  };
  this.nodes = [/* this.nodesDict["x150:y150"] */];

  // Arc queries look like this: arcs["x150:y150"]["x250:y250"]
  this.arcs = {};

  //if used with both args it will create an arc between if only with one it will create one lonely node :'(
  this.createNode = (node, nodeToCreate) => {
    let result;
    const spawnNode = ($node, $nodeDictQuery) => {
      const created = Object.assign({}, $node);
      this.nodes.push(created);
      this.nodesDict[$nodeDictQuery] = created;
      return created;
    }
    const nodeDictQuery = `x${node.x}:y${node.y}`;
    if (nodeToCreate) {
      const nodetoCreateDictQuery = `x${nodeToCreate.x}:y${nodeToCreate.y}`;
      console.log(nodeDictQuery)
      console.log(!!this.nodesDict[nodeDictQuery])
      console.log(!this.nodesDict[nodetoCreateDictQuery])
      const verifications = [
        !!this.nodesDict[nodeDictQuery],
        !this.nodesDict[nodetoCreateDictQuery],
      ];
      if (reduce((acc, elem) => acc && elem, true, verifications)) {
        result = spawnNode(nodeToCreate, nodetoCreateDictQuery);
        if (!this.arcs[nodeDictQuery]) {
          this.arcs[nodeDictQuery] = {};
        }
        this.arcs[nodeDictQuery][nodetoCreateDictQuery] = Symbol();
      }
      console.log('2: ', 'here');
      console.log(this.nodes)
      console.log(nodeDictQuery);
    } else {
      if (!this.nodesDict[nodeDictQuery]) {
        result = spawnNode(node, nodeDictQuery);
      }
    }
    return result;
  };
};

export const initializeGraph = (state) => {
  const { prefilledNodes } = getGuide(state);
  const graph = new Graph();
  const { createNode } = graph;
  let lastNode;
  forEach((node) => {
    console.log('1: ', lastNode);
    lastNode = !lastNode ? createNode(node) : createNode(lastNode, node);
  }, prefilledNodes)
  return assoc("graph", graph, state);
};

export const drawLinesInAngle = curry((state, length, angle) => {
  const graph = getGraph(state);
});

export const draw = (state) => {
  return state;
};
