const data= require('./part1_input');
const checkSum= {
    twoTimes: 0,
    threeTimes: 0
}

const buildCheckSum= (input) =>{
    const alreadyFound= {
        twoTimes: false,
        threeTimes: false
    } 

    Object.entries(input).forEach((keyValue) => {
        console.log(keyValue);

            switch(keyValue[1]){
                case 2: 
                    
                    checkSum.twoTimes= !alreadyFound.twoTimes ? checkSum.twoTimes+1: checkSum.twoTimes;
                    alreadyFound.twoTimes= true;
                    break;
                case 3: 
                    checkSum.threeTimes= !alreadyFound.threeTimes ? checkSum.threeTimes+1: checkSum.threeTimes;
                    alreadyFound.threeTimes= true;
                    break;
                default:
                    break;
            }
    })
}

data.inputArray.forEach((entry, i) => {
    console.log(`${i} Charset`);
    let obj= {};
    entry.split('').forEach((char, i) => {
        console.log(char);
        if(!obj.hasOwnProperty(char)){
            obj[char]= 1;
        }else{
            obj[char]++;
        }
    });
    buildCheckSum(obj);
});

console.log(checkSum.twoTimes*checkSum.threeTimes);
