let count=0;

increment=()=> {
    count++;
    console.log(`Current count: ${count}`);
}

decrement=()=> {
    count--;
    console.log(`Current count: ${count}`);
}

reset=()=> {
    count = 0;
    console.log(`Counter reset. Current count: ${count}`);
}

getCount=()=> {
    return count;
}

increment(); 
decrement(); 
reset();     
console.log(getCount());