import {
  assoc,
  curry,
  find,
  forEach,
  identity,
  ifElse,
  keys,
  map,
  max,
  min,
  multiply,
  reduce,
} from "ramda";
import { getGraph, getGuide } from "./state.js";
import {
  calculateColissionBetweenTwoLines,
  calculateDistance,
  calculateMGiven2Points,
  calculateY,
} from "./utils/calculations-2D.js";
import { cos, sin } from "./utils/conversions.js";
import { calcDistanceToCenter } from "./canvas.js";

export const Graph = function () {
  this.idSeq = 1;

  this.nodesDict = {
    /* "x150:y150": { x: 150, y: 150 }, */
  };
  this.nodes = [
    /* this.nodesDict["x150:y150"] */
  ];

  // Arc queries look like this: arcs["x150:y150"]["x250:y250"]
  this.arcs = {};

  this._buildNodeQuery = (node) => `x${node.x}:y${node.y}`;

  //if used with both args it will create an arc between if only with one it will create one lonely node :'(
  this.createNode = (node, nodeToCreate) => {
    let result;
    const spawnNode = ($node, $nodeDictQuery) => {
      const created = Object.assign({}, $node);
      this.nodes.push(created);
      this.nodesDict[$nodeDictQuery] = created;
      return created;
    };
    const nodeDictQuery = this._buildNodeQuery(node);
    if (nodeToCreate) {
      const nodetoCreateDictQuery = this._buildNodeQuery(nodeToCreate);
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
    } else {
      if (!this.nodesDict[nodeDictQuery]) {
        result = spawnNode(node, nodeDictQuery);
      }
    }
    return result;
  };

  this.createNodesFromInstruction = (operation, params, state) => {
    const {
      build: { encodedIndex },
      input: { encoded },
    } = state;
    const byte = encoded[encodedIndex];
    const startIndex = this._chooseNodeIndexFromByte(byte);
    this[operation]([...params], startIndex, state);
  };

  this.drawLinesInAngle = (length, angle, startIndex, state) => {
    const { nodes: {sort: sortNodes} } = this;
    const sortedNodes = sortNodes((a, b) => calcDistanceToCenter(a) - calcDistanceToCenter(b));
    let lookupNode = sortedNodes[startIndex];
    const nodeAux = {x: multiply(cos(angle), length), y: multiply(sin(angle), length)};
    //calculate new coordinates of new node lookupNode + nodeAux
    const newNode = {x: nodeAux.x+lookupNode.x, y: nodeAux.y+lookupNode.y};
    //Search on Arcs if there's a collission with that line
    const iterator = this._iterateArcs();
    let isCollision = false;
    for(let selectedArc of iterator) {
      isCollision = this.isThereCollision(lookupNode, selectedArc);
      if (isCollision) {
        break;
      }
    }
    //If there is, try with the rest of the graph nodes 
    /* find(node => {
      const node2 = ;
      return !this.isThereCollision();
    }, sortedNodes) */
  };

  this._iterateArcs = function* () {
    forEach((nodeQuery) => {
      forEach((nodeQuery2) => {
        const arc = {origin: this.nodesDict[nodeQuery], dest: this.nodesDict[nodeQuery2]};
        yield arc;
      }, keys(this.arcs[nodeQuery]));
    }, keys(this.arcs));
  }

  this.isThereCollision = (nodeAA0, nodeAA1, nodeBB0, nodeBB1) => {
    const { x: xAA0, y: yAA0 } = nodeAA0;
    const { x: xAA1, y: yAA1 } = nodeAA1;
    const { x: xBB0, y: yBB0 } = nodeBB0;
    const { x: xBB1, y: yBB1 } = nodeBB1;
    const line1 = calculateLineEquationGive2Points(xAA0, yAA0, xAA1, yAA1);
    const line2 = calculateLineEquationGive2Points(xBB0, yBB0, xBB1, yBB1);
    const x = calculateColissionBetweenTwoLines(line1, line2);
    return ifElse(isNaN, isNaN, (xParam) => {
      const y = calculateY(xParam, line1);
      return  yAA0 < y < yAA1 || yAA0 > y > yAA1;
    })(x);
  };

  this._chooseNodeIndexFromByte = (byte) => {
    const {
      nodes: { length: l },
    } = this;
    const { floor } = Math;
    const intervalRange = floor(255 / l);
    return floor(byte / intervalRange);
  };
};

export const initializeGraph = (state) => {
  const { prefilledNodes } = getGuide(state);
  const graph = new Graph();
  const { createNode } = graph;
  let lastNode;
  forEach((node) => {
    lastNode = !lastNode ? createNode(node) : createNode(lastNode, node);
  }, prefilledNodes);
  return assoc("graph", graph, state);
};

export const drawLinesInAngle = curry((state, length, angle) => {
  const graph = getGraph(state);
});

export const draw = (state) => {
  return state;
};
