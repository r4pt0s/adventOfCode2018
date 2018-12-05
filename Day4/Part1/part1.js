const data= require('./part1_input');

const test= `[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-01 00:00] Guard #10 begins shift
[1518-11-02 00:50] wakes up
[1518-11-05 00:45] falls asleep
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:55] wakes up`;

let guardsRecordsArray= {};
let temp= null;
let guardNo= false;
let minuteAsleep= null;
let minuteAwake= null;



const records= data.inputArray
                    .map((record) => record.split('] '))
                    .map((record) => [record[0].replace('[',''), record[1]])
                    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())

const fillHashmap= (asleep, sleepUntil, initValue, fillWith= false) => {

    let hashMap= fillWith || new Array(60).fill(0);

    for(let i=Number(asleep); i < Number(sleepUntil); i++){
        if(hashMap[i] >= 1){
            hashMap[i]+=1
        }else{
            hashMap[i]=initValue;
        }
    }

    return hashMap;
}
                    

const buildGuardRecordObjPerDate= ([dateTime, entryText]) => {
    let [recordDate, recordTime] = dateTime.split(/[\s]+/);


    if(entryText.includes('#')){
        guardNo= entryText.split(/[\sA-Za-z#]+/).slice(1,2).pop();
    }
        

    if(entryText.includes('asleep')){
        minuteAsleep= recordTime.split(/[:]+/)
                                .pop();
    }

    if(entryText.includes('wakes')){
        minuteAwake= recordTime.split(/[:]+/)
                                .pop();
    }       

    if(minuteAwake !== null){
        
        if(guardsRecordsArray.hasOwnProperty(guardNo)){

            guardsRecordsArray[guardNo].totalSleep+= (minuteAwake-minuteAsleep),
            guardsRecordsArray[guardNo].sleepTable= fillHashmap(minuteAsleep, minuteAwake, 1, guardsRecordsArray[guardNo].sleepTable)

        }else{
            temp= { [guardNo]: {
                        totalSleep: (minuteAwake-minuteAsleep),
                        sleepTable: fillHashmap(minuteAsleep, minuteAwake, 1)
                    }
                };
            guardsRecordsArray= { ...guardsRecordsArray, ...temp };
        }

        minuteAsleep= null;
        minuteAwake= null;
    }
}                


records.forEach((record) => {
    buildGuardRecordObjPerDate(record);
});

const returnMostSleptMinute= (minutesArray) => {
    let theMinute= null;

    for(let i=0; i < minutesArray.length; i++){
        if(minutesArray[i] === Math.max.apply(Math, minutesArray)){
            theMinute=i;
        }
    }

    return theMinute;
}

const answer= Object.entries(guardsRecordsArray).reduce((mostlyAsleepGuard, currentGuard) => {
    if(mostlyAsleepGuard.id){
        if(currentGuard[1].totalSleep > mostlyAsleepGuard.totalSleep){
            return ({ id: currentGuard[0], totalSleep: currentGuard[1].totalSleep, mostlyMinute: returnMostSleptMinute(currentGuard[1].sleepTable) });
        }else{
            return mostlyAsleepGuard;
        }
    }else{
        return ({ id: currentGuard[0], totalSleep: currentGuard[1].totalSleep, mostlyMinute: returnMostSleptMinute(currentGuard[1].sleepTable) });
    }    
    
},{});

console.log("Answer: ", (Number(answer.id)*answer.mostlyMinute));


