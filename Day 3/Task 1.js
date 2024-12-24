function APIcall(url){
    return new Promise((resolve, reject)=>{
        console.log(`Making API call to ${url}`);
        setTimeout(()=>{
            fetch(url).then(response=>{
                if(!response.ok){
                    throw new Error("Couldn't fetch any data");
                }
                return response.text();
            })
            .then(data=>resolve(data))
            .catch(error=>reject(error));
        }, 2000);
    });
}

APIcall('https://v2.jokeapi.dev/joke/Programming?format=txt').then(response=>{
    console.log('API call successful:',response);
}).catch(error=>{
    console.error('API call failed:', error);
});