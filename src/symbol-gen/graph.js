import {
  assoc,
  curry,
  findIndex,
  forEach,
  ifElse,
  keys,
  multiply,
  reduce,
  sort,
} from "ramda";
import { getGraph, getGuide } from "./state.js";
import {
  calculateColissionBetweenTwoLines,
  calculateLineEquationGive2Points,
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

  this.executeInstruction = (operation, params, state) => {
    const {
      build: { encodedIndex },
      input: { encoded },
    } = state;
    const byte = encoded[encodedIndex];
    const startIndex = this._chooseNodeIndexFromByte(byte);
    this[operation](...params, startIndex, state);
  };

  this.drawLinesInAngle = (length, angle, startIndex, state) => {
    const { nodes } = this;
    const sortedNodes = sort(
      (a, b) => calcDistanceToCenter(a) - calcDistanceToCenter(b),
      nodes
    );
    let { x: lookupNodeX, y: lookupNodeY } = this.nodes[startIndex];
    const lookupNodeSortedIndex = findIndex(
      ({ x, y }) => lookupNodeX === x && lookupNodeY === y,
      sortedNodes
    );
    [sortedNodes[0], sortedNodes[lookupNodeSortedIndex]] = [
      sortedNodes[lookupNodeSortedIndex],
      sortedNodes[0],
    ];
    let isCollision = false;
    console.log({ length, angle, startIndex });
    const nodeAuxX = multiply(cos(angle), length),
      nodeAuxY = multiply(sin(angle), length);
    let found;
    //calculate new coordinates of new node lookupNode + nodeAux
    //Search on Arcs if there's a collission with that line
    for (let node of sortedNodes) {
      const {x: nodeX, y: nodeY} = node; 
      let newNode = { x: nodeAuxX + nodeX, y: nodeAuxY + nodeY };
      const iterator = this._iterateArcs();
      for (const { origin, dest } of iterator) {
        isCollision = this.isThereCollision(node, newNode, origin, dest);
        console.log({isCollision});
        if (isCollision) {
          break;
        }
      }
      if (!isCollision) {
        found = [node, newNode];
        break;
      }
    }
    if (!isCollision) {
      this.createNode(found[0], found[1]);
      return found[0];
    }
    return {x: null, y: null};
  };

  this._iterateArcs = function* () {
    for (let nodeQuery of keys(this.arcs)) {
      for (let nodeQuery2 of keys(this.arcs[nodeQuery])) {
        const arc = {
          origin: this.nodesDict[nodeQuery],
          dest: this.nodesDict[nodeQuery2],
        };
        yield arc;
      }
    }
  };

  this.isThereCollision = (nodeAA0, nodeAA1, nodeBB0, nodeBB1) => {
    const { x: xAA0, y: yAA0 } = nodeAA0;
    const { x: xAA1, y: yAA1 } = nodeAA1;
    const { x: xBB0, y: yBB0 } = nodeBB0;
    const { x: xBB1, y: yBB1 } = nodeBB1;
    console.log({xAA0, yAA0, xAA1, yAA1})
    console.log({xBB0, yBB0, xBB1, yBB1})
    const line1 = calculateLineEquationGive2Points(xAA0, yAA0, xAA1, yAA1);
    console.log({line1});
    const line2 = calculateLineEquationGive2Points(xBB0, yBB0, xBB1, yBB1);
    console.log({line2});
    const x = calculateColissionBetweenTwoLines(line1, line2);
    console.log({x});
    return ifElse(isNaN, isNaN, (xParam) => {
      const y = calculateY(xParam, line1);
      return yAA0 < y < yAA1 || yAA0 > y > yAA1;
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
