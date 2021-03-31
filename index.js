const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', { 
    params: {
        apikey: '4323451', //parametros para fazer a busca = apikey dado + o search desejado (futuramente terá barra)
        // s: 'avengers' //o axios que consegue colocar esse parametros como url direitinho... comentado pq dps do s, usaremos o 'i'
        s: searchTerm
    }
});

if (response.data.Error){ //não aparecer erro quando procurar algo que não tem no API
    return [];
}

return response.data.Search;
}

const root = document.querySelector('.autocomplete') //CSS para o searchbar. Documentação Bulma.
root.innerHTML =`
<label><b>Search for a Movie</b></label>
<input class="input"/>
<div class="dropdown"> 
    <div class="dropdown-menu">
        <div class="dropdown-content results"></div>     
    </div>
</div>`

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');//seleciona o div com class dropdown, para tornar ativo na search
const resultsWrapper = document.querySelector('.results');//seleciona o dropdown item com class results


const onInput = async (ev) => {   //pq fetchdata é um async function, temos que colocar async aqui tb para termos resultados
    const movies =  await fetchData(ev.target.value); // se não colocarmos await, retornará uma promise
    
    resultsWrapper.innerHTML =''; //para limpar a busca feita, caso tenha tido uma anterior
    dropdown.classList.add('is-active')//fazendo o menu ficar ativo quando digitar algo
  
     for (let movie of movies) {
        const option = document.createElement('a');//na documentação pede que seja uma anchor tag
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;  // ternary expression para caso houver nenhuma imagem de poster 

        option.classList.add('dropdown-item') //pra aparecer os itens no search
        option.innerHTML = `
         <img src="${imgSrc}" />
         ${movie.Title}
     `; 
    
     resultsWrapper.appendChild(option);
     }
    };
     
 input.addEventListener('input', debounce(onInput));

 document.addEventListener('click', event => { //evento para clicar fora do search bar e widget para sumir a busca
     if (!root.contains(event.target));{ //se não estiver no root, tirar o is active
     dropdown.classList.remove('is-active');
    }
 });