const debounce = (func, delay = 1000) => { //foi pega a logica anterior e transformada para uma funçao para usar no futuro
    let timeoutId;
    return (...args) => { //fez o spread de todos os argumentos que podem ser utilizados.
        if (timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() =>{
        func.apply(null, args)
    }, delay)
}
}
// let timeoutID; //timeoutID vai ser o retorno do que setTimeout passa

//     if (timeoutID) {
//     clearTimeout(timeoutID)
// };//condiçao para zerar o tempo toda vez que uma tecla for pressionada
//    timeoutID = setTimeout(() => {