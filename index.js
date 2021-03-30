const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', { 
    params: {
        apikey: '4323451', //parametros para fazer a busca = apikey dado + o search desejado (futuramente terá barra)
        // s: 'avengers' //o axios que consegue colocar esse parametros como url direitinho... comentado pq dps do s, usaremos o 'i'
        s: searchTerm
    }
});
return response.data.Search;
}

const input = document.querySelector('input')


const onInput = async (ev) => {   //pq fetchdata é um async function, temos que colocar async aqui tb para termos resultados
   const movies =  await fetchData(ev.target.value); // se não colocarmos await, retornará uma promise
   
 
    for (let movie of movies) {
        const div = await document.createElement('div');

    div.innerHTML = `
        <img src="${movie.Poster}" />
        <h1>${movie.Title}</h1>
    `; 
    document.querySelector('#target').appendChild(div);
    }
   };
    
input.addEventListener('input', debounce(onInput));