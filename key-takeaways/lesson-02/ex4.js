const height = 164;
const oddHeight = height % 100;
const minWeight = oddHeight * 8 / 10; 
const idealWeight =  oddHeight * 9 / 10;
const maxWeight = oddHeight;

console.log(idealWeight, maxWeight, minWeight)