const data= require('../input');

let polymer= data.inputString.split('').map((char) => char.charCodeAt(0));
let nextRound= true;
let roundCounter= 0;
const charCodeDiff= 32;
let answer= [];

const checkIfSimilar= (curChar, nextChar) => {

    const result= curChar-nextChar;
    return (result === charCodeDiff || result === -(charCodeDiff));
}

while(nextRound){
    nextRound= false;
    reaction= false;
    console.log("=====================NEXT ROUND===========================");

    for(let i=0; i < polymer.length; i++){
        let curChar= polymer[i];
        let nextChar= polymer[i+1];
    
        if(checkIfSimilar(curChar, nextChar)){
            nextRound= true;
            reaction= true;
            i++;
            console.log("reaction");

        }else{
            answer.push(curChar);
        }         
    }

    if(nextRound){
        polymer= [...answer];
        answer= [];
    }

}
console.log("THE ANSWER IS: ",answer.map((char) => String.fromCharCode(char)).length);

