import { reduce } from "ramda";


export const Graph = function () {
  this.idSeq = 1;

  this.nodesDict = {
    "x150:y150": { x: 150, y: 150},
  };
  this.nodes = [this.nodesDict["x150:y150"]];

  // Arc queries look like this: arcs["x150:y150"]["x250:y250"]
  this.arcs = {};

  this.createNode = (node, nodeToCreate) => {
    const nodeDictQuery = `x${node.x}:y${node.y}`;
    const nodetoCreateDictQuery = `x${nodeToCreate.x}:y${nodeToCreate.y}`;
    const verifications = [
      !!this.nodesDict[nodeDictQuery],
      !this.nodesDict[nodetoCreateDictQuery],
    ];
    if (reduce((acc, elem) => acc && elem, true, verifications)) {
      const created = Object.assign({}, nodeToCreate);
      this.nodes.push(created);
      this.nodesDict[nodeDictQuery] = created;
      if (!this.arcs[nodeDictQuery]) {
        this.arcs[nodeDictQuery] = {};
      }
      this.arcs[nodeDictQuery][nodetoCreateDictQuery] = Symbol();
    }
  };
};

export const draw = (state) => {
  return state;
};