var map = L.map('map').setView([-22.5514, -45.7792], 14);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            var marker;

            function pressionarEnter(event) {
                if (event.keyCode === 13) {
                    buscarLocalizacao();
                }
            }

            function buscarLocalizacao() {
                var nomeLocalizacao = document.getElementById('localizacao').value;
                if (nomeLocalizacao === '') {
                    alert('Por favor, digite a localização.');
                    return;
                }

                var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(nomeLocalizacao);

                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length === 0) {
                            alert('Localização não encontrada.');
                        } else {
                            var latitude = parseFloat(data[0].lat);
                            var longitude = parseFloat(data[0].lon);

                            if (marker) {
                                map.removeLayer(marker);
                            }

                            marker = L.marker([latitude, longitude]).addTo(map);

                            map.setView([latitude, longitude], 13);
                        }
                    })
                    .catch(error => {
                        alert('Ocorreu um erro ao buscar a localização: ' + error);
                    });
            }