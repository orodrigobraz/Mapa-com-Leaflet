const map = L.map('map').setView([-22.5514, -45.7792], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker;

/**
 * 
 * @param {*} event Evento ao pressionar qualquer tecla
 */
const pressionarEnter = (event) => {
    if (event.keyCode === 13) {
        buscarLocalizacao();
    }
}

/**
 * Busca a localização com base no nome digitado dentro do input
 * 
 */
const buscarLocalizacao = async () => {
    const nomeLocalizacao = document.getElementById('localizacao').value;
    if (nomeLocalizacao === '') {
        alert('Por favor, digite a localização.');
        return;
    }

    const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(nomeLocalizacao);

    try {
        const dados = await (await fetch(url)).json();

        if (dados.length === 0) {
            alert('Localização não encontrada.');
        } else {
            const latitude = parseFloat(dados[0].lat);
            const longitude = parseFloat(dados[0].lon);

            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker([latitude, longitude]).addTo(map);

            map.setView([latitude, longitude], 13);
        }
    } catch (error) {
        alert('Ocorreu um erro ao buscar a localização: ' + error);
    }
}