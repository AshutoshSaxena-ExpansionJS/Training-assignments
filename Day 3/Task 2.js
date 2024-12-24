function api(){
    return fetch('https://v2.jokeapi.dev/joke/Programming?format=txt').then(response=>response.text())
    .then(joke=>{
        console.log(joke)
    }).catch(error=>console.error('Error fetching joke:', error));
}

api();