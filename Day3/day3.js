const data= require('./input');
const testInput= ['#1 @ 1,3: 4x4','#2 @ 3,1: 4x4','#3 @ 5,5: 2x2'];

let overlapCount= 0;
let overlapPositions= [];
let claimId= 1;

/*********************************************************************************************************/
/*Initialization fabric                                                                                  */
/*********************************************************************************************************/
const fabric= new Array(1000);
for(let i=0; i < 1000; i++){
    fabric[i]=new Array(1000);
}

/*********************************************************************************************************/
/*Input Manipulation                                                                                     */
/*********************************************************************************************************/
const matricesRaw= data.inputArray.map((matrixRaw) => matrixRaw.replace(/\s+/g, '').split('@'))
                            .map((matrixRaw) => matrixRaw[1].split(':'));

/*********************************************************************************************************/
/*PART 1                                                                                                 */
/*********************************************************************************************************/
const buildMatrix= (claim, claimId) => {
    const [fromLeft, fromTop] = claim[0].split(',');
    const [width, height] = claim[1].toLowerCase().split('x');    

    for(let i=0; i < height; i++){
        for(let j=0; j < width; j++){
            if(fabric[i+Number(fromTop)][j+Number(fromLeft)] !== undefined){
                if(!overlapPositions.includes(`${i+Number(fromTop)}x${j+Number(fromLeft)}`)){
                    overlapCount++;
                }
                fabric[i+Number(fromTop)][j+Number(fromLeft)]= 'X';
                overlapPositions.push(`${i+Number(fromTop)}x${j+Number(fromLeft)}`);
            }else{
                fabric[i+Number(fromTop)][j+Number(fromLeft)]= claimId;
            }
            process.stdout.write(`${fabric[i+Number(fromTop)][j+Number(fromLeft)]}`);
        }
        process.stdout.write(`\n`);
        
    }

}

while(claimId <= matricesRaw.length){
    buildMatrix(matricesRaw[claimId-1], claimId);
    claimId++;
}

/*********************************************************************************************************/
/*PART 2                                                                                                 */
/*********************************************************************************************************/
let uniqueClaim= null;
let temp= 0;

claimId= 1;

const searchForPureClaim= (claim, claimId) => {
    const [fromLeft, fromTop] = claim[0].split(',');
    const [width, height] = claim[1].toLowerCase().split('x');
    let pureClaim= true;

    for(let i=0; i < height; i++){
        for(let j=0; j < width; j++){
            if(fabric[i+Number(fromTop)][j+Number(fromLeft)] === 'X'){
                pureClaim= false;
            }
            process.stdout.write(`${fabric[i+Number(fromTop)][j+Number(fromLeft)]}`);
        }
        process.stdout.write(`\n`);
    }

    return (pureClaim) ? claimId : false;
}

while(claimId <= matricesRaw.length){
    temp= searchForPureClaim(matricesRaw[claimId-1], claimId);
    if(temp){
        uniqueClaim= temp;
    }
    claimId++;
}

/*********************************************************************************************************/
/*Answer PART 1                                                                                          */
/*********************************************************************************************************/
console.log('OVERLAP COUNT: ',overlapCount);

/*********************************************************************************************************/
/*Answer PART 2                                                                                          */
/*********************************************************************************************************/
console.log('Pure Claim: ', uniqueClaim);
