import { reduce } from "ramda";

/**
 * TODO
 * LSH implementation not finished due to lack of documentation
 * Not very clear how to implement it
 */

const shuffleSet = (set) => {
  const iterator = set.keys();
  const vocabKeys = [];
  let next = iterator.next();
  while(!next.done) {
    vocabKeys.push(next.value);
    next = iterator.next();
  }
  const shuffledArray = vocabKeys.sort((a,b) => Math.floor(Math.random() * 2) - 1);
  return {shuffledArray, shuffledSet: new Set(shuffledArray)};
}

const arrayToObject = (array) => {
  let index = 0;
  return reduce((acc, elem) => {acc[elem] = index; index++; return acc}, {}, array);
}

const createZeroesNArray = (n) => {
  let i = 0;
  const newArray = [];
  while (i < n) {
    newArray.push(0);
    i++;
  }
  return newArray;
} 

export const generateLsh =
  (shingleSize, numberOfFunctions, bucketSize) =>
  (input = "") => {
    const shingles = new Set();
    const chars = input.split("");
    const range = [0, shingleSize - 1];
    chars.map((_, i) => {
      let word = [];
      for (let j = range[0]; j <= range[1]; j++) {
        const finalIndex = i + j;
        if (finalIndex < 0 || finalIndex >= chars.length) {
        } else {
          word.push(chars[i + j]);
        }
      }
      if (i + range[1] < chars.length) {
        shingles.add(word.join(""));
      }
    });
    const {shuffledArray, shuffledSet} = shuffleSet(shingles);
    console.log('here1')
    const shuffledIndexesObject = arrayToObject(shuffledArray);
    console.log('here2')
    //Create one hot encoding
    const oneHotEncodedList = [];
    shingles.forEach((val1) => {
      const oneHotEncoded = createZeroesNArray(shingles.size);
      oneHotEncoded[shuffledIndexesObject[val1]] = 1;
      oneHotEncodedList.push(oneHotEncoded)
    });
    console.log(oneHotEncodedList);
    /* createZeroesNArray(vocab.size); */
  };
  
  