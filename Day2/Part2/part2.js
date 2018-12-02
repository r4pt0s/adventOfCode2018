    const data= require('./part2_input');

    const charsSplit= data.inputArray.map((ids) => ids.split(''));
    const predictedIds= [];

    const compareIds = (searchId, idSet) => {
        const result= {
            correctId: [],
            score: 0
        };

        idSet.forEach(id => {
            id.forEach((char, i) => {
                if(char === searchId[i])
                {
                    result.correctId.push(char);     
                }
            })  
            predictedIds.push({ correctId: result.correctId, score: result.correctId.length});
            result.correctId= []
            result.score= 0;
    
        });
    }

    while(charsSplit.length > 0){
        compareIds(charsSplit.shift(), charsSplit);
    }


    const result= predictedIds.sort((a,b) => b.score - a.score).slice(0,1).pop();

    console.log(result.correctId.join(''));
