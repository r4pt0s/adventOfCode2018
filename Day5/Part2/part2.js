const data= require('../input');
const test="dabAcCaCBAcCcaDA";


const charCodeDiff= 32;
let answer= null;
const dictonary= {};

let polymer= data.inputString.split('');
let joinedPolymer= polymer.join('');
let replacedPolymer= null;



for(var i=97; i <= 122; i++){
    dictonary[String.fromCharCode(i)]= 0;
}


const checkIfSimilar= (curChar, nextChar) => {

    const result= curChar-nextChar;

    return (result === charCodeDiff || result === -(charCodeDiff));
}


const finishedPolymer= (inputPolymer) => {
    
    let temp= [];
    let nextRound= true;
    let returnPolymer=  inputPolymer.split('').map((char) => char.charCodeAt(0));

    while(nextRound){
        nextRound= false;
        reaction= false;
    
        for(let i=0; i < returnPolymer.length; i++){
            let curChar= returnPolymer[i];
            let nextChar= returnPolymer[i+1];
        
            if(checkIfSimilar(curChar, nextChar)){
                nextRound= true;
                reaction= true;
                i++;
    
            }else{
                temp.push(curChar);
            }         
        }
        if(nextRound){
            returnPolymer= [...temp];
            temp= [];
        }
    
    }

    return returnPolymer;
}

Object.keys(dictonary).forEach((charCode) => {
    let regex= new RegExp (charCode,'gi');
    replacedPolymer= joinedPolymer.replace(regex, '')

    console.log("#######################################TESTING NEXT REGEX##############################################");
    dictonary[charCode]= finishedPolymer(replacedPolymer).length;

    if(dictonary[charCode] < answer || answer === null)
    {
        answer= dictonary[charCode];
    }
});


console.log("THE ANSWER IS: ", answer);

