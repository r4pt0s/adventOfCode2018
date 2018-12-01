    const data= require('./part2_input');

    const reachesTwice= (input) => {
        const store= {frequencies: [ 0 ], answer: [ ]};
        let itemFound= false;

        while(itemFound === false){

        input.reduce((frequency, changeOf) => {
                
                if(changeOf){
                    frequency+= Number(changeOf);
    
                    if(store.frequencies.includes(frequency))
                    {
                        store.answer.push(frequency);
                        console.log('FOUND Current frequency', 
                        store.frequencies[store.frequencies.length-1], 
                        'change of;',
                        changeOf , 
                        'resulting frequency ', 
                        frequency);
                        itemFound= true;
                        
                    }else{
                        console.log('Current frequency', 
                        store.frequencies[store.frequencies.length-1], 
                        'change of;',
                        changeOf , 
                        'resulting frequency ', 
                        frequency);
                        store.frequencies.push(frequency);
                        
                    }
                    
                }
                return frequency;
                
            },store.frequencies[store.frequencies.length-1] || 0);
        
        }

        console.log('The Answer is:', store.answer[0]);
    }

    reachesTwice(data.inputArray);