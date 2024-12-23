function highOrder(para1) {

    return(
    function (para2) {
        const merge = [...para1, ...para2];

        let result = merge.map((merge)=>{
            return merge*2;
        }).filter((merged)=>{
            if(merged%4==0)
                return merged;
        })
        return result;
    });
}

let A=[12,23,34,45,56,67,78,89,90];
let call1=highOrder(A);
let call2=call1([23,45,56,77]);
console.log(call2);