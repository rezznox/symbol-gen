import numbers from "numbers";
import { __, identity, ifElse } from "ramda";
import { pow } from "../utils/conversions.js";

export function VectorFactory(origin) {
  const Vector = function (x, y, t) {
    this.coor = ifElse(
      identity,
      () => numbers.matrix.subtraction([x, y], origin),
      () => [x, y]
    )(t);

    this.sum = (secondVector) => {
      const [x, y] = numbers.matrix.addition(this.coor, secondVector.coor);
      return new Vector(x, y);
    };

    this.subtract = (secondVector) => {
      const [x, y] = numbers.matrix.subtraction(this.coor, secondVector.coor);
      return new Vector(x, y, false);
    };

    this.dotProduct = (secondVector) =>
      numbers.matrix.dotproduct(this.coor, secondVector.coor);

    this.mag = () => {
      const sum = this.coor.map(pow(__, 2)).reduce((x, curr) => x + curr, 0);
      return pow(sum, 0.5);
    };

    this.prototype = {
      sum: (v1, v2) => {
        return v1.sum(v2);
      },
      subtract: (v1, v2) => {
        return v1.subtract(v2);
      },
      dotProduct: (v1, v2) => {
        return v1.dotProduct(v2);
      }
    };
  };
  this.bVector = (x, y) => new Vector(x, y, true);
  this.vector = Vector;
}

/* const fact = new VectorFactory([150, 150]);
const v1 = fact.bVector(150, 160);
const v2 = fact.bVector(150, 170);
const v3 = fact.bVector(170, 170);
console.log(v1.sum(v2));
console.log(v1.subtract(v2));
console.log(v1.dotProduct(v2));
console.log(v3.mag()); */
/* console.log(numbers.matrix.transpose(v2.coor)); */
/* const vector2 = Object.create(fact.vector)
console.log(vector2.prototype) */
