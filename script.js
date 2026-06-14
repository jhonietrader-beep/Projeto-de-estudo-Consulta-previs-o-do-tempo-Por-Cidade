document.getElementById('submitbutton').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('alertanome').innerHTML = '';
    document.getElementById('alertaprofissao').innerHTML = '';
    document.getElementById('alertacidade').innerHTML = '';
    document.getElementById('cards').innerHTML = '';
 

    const name = document.getElementById('name').value.trim();
    const profissao = document.getElementById('profissao').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
  
    const apikey = 'f087e054068ae0352d06a122a524c673'
    let temErro = false;

    if(name === '')  {
        document.getElementById('alertanome').innerHTML = '⚠️insira o nome ';
        temErro = true;
    }
    if(profissao === '') {
        document.getElementById('alertaprofissao').innerHTML = '⚠️insira a profissão';
        temErro = true;
    }
    if(cidade === '') {
        document.getElementById('alertacidade').innerHTML ='⚠️insira a cidade correta';
        temErro = true;
    }
    if(temErro) return;
    const urlGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=${apikey}`;

    fetch(urlGeo)
    .then(response => response.json())

    .then(data => {
        console.log(data);

        if(data.length === 0) {
             throw new Error('Cidade não encontrada');
        }

        const latitude = data[0].lat;
        const longitude = data[0].lon;

        const urlTempo = 
         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric&lang=pt_br`;
        
         return fetch(urlTempo);

         })
         .then(response => response.json())
        
         .then(clima => {
            document.getElementById('cards').innerHTML =  `
                   <h3>Olá ${name}</h3>
                <p>Profissão: ${profissao}</p>
                <p>Cidade: ${cidade}</p>
                <p>Temperatura: ${clima.main.temp}°C</p>
                <p>Clima: ${clima.weather[0].description}</p>
            `;
         })
            
            
         
         
         .catch((error) => {
    console.log(error);

    document.getElementById('alertacidade').innerHTML =
        '⚠️ Erro ao buscar dados do clima';
});

    });