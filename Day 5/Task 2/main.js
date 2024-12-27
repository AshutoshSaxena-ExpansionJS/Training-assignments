document.addEventListener('DOMContentLoaded',function(){
    const savedName=localStorage.getItem('name');
    const savedEmail=localStorage.getItem('email');
    if(savedName)
        document.getElementById('name').value=savedName;
    if(savedEmail)
        document.getElementById('email').value=savedEmail;
    document.getElementById('name').addEventListener('input', debounce(saveData, 500));
    document.getElementById('email').addEventListener('input', debounce(saveData, 500));
})

function debounce(func, delay){
    let timeout;
    return function(...args){
        clearTimeout(timeout);
        timeout=setTimeout(()=>func(...args), delay);
    };
}
function saveData(){
    const name=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    localStorage.setItem('name',name);
    localStorage.setItem('email',email);
}