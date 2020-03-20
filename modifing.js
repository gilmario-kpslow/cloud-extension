console.log("INITI");
function createFloco(i) {
    console.log("CREATE", i);
    if(i < 10000) {
        let loader = document.createElement('div');
        loader.classList.add('loader');
        document.body.appendChild(loader);
        setTimeout(createFloco, time(), i + 1);
        console.log("FLOCO CRIADO", i);
    }
}
createFloco(0);
console.log("FIM");
function time() {
   return  ( Math.random() * 2000 ) + 500;
}