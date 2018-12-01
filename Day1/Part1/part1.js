const data= require('./part1_input');

const result= data.inputArray.reduce( (acc, cur) => (acc+Number(cur)),0);

console.log(result);
