const fetchData = async () => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
        apikey: '4323451',
        s: 'avengers'
        }
    });
    console.log (response.data);
}


fetchData();

