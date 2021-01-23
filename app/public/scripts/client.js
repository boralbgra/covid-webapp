var global;
var counter = 30; //ya que muestra 24 por defecto
var max = 18;

axios.get('/xd')
    .then(function (response) {
        global = response.data;
        counter = 24;
    })
    .catch(function (error) {
        console.log(error);
    });

window.addEventListener('scroll', () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 2) {
        xd();
    }
});

$("footer").css("display", "none");

function xd() {
    if (counter <= global.length) {
        let html2 = '';

        var top = counter + max;
        if (counter + max >= global.length) {
            top = global.length;
            $("footer").css("display", "block");
        }

        for (let i = counter; i < top; i++) {
            html2 +=
                `<div class="container-country">
                    <div style="display: flex; align-items: center; margin-top: -5px;">
                        <img src=${global[i].Flag} class="img-logo2">
                        <p class="title">${global[i].Country}</p>
                    </div>
                    <div class="container-data2">
                        <div>
                            <p class="upper-text">+${new Intl.NumberFormat("es-ES").format(global[i].NewConfirmed)}</p>
                            <p class="text">${new Intl.NumberFormat("es-ES").format(global[i].TotalConfirmed)}</p>
                            <p class="sub-text">cases</p>
                        </div>
                        <div>
                            <p class="upper-text">+${new Intl.NumberFormat("es-ES").format(global[i].NewRecovered)}</p>
                            <p class="text">${new Intl.NumberFormat("es-ES").format(global[i].TotalRecovered)}</p>
                            <p class="sub-text">recovered</p>
                        </div>
                        <div>
                            <p class="upper-text">+${new Intl.NumberFormat("es-ES").format(global[i].NewDeaths)}</p>
                            <p class="text">${new Intl.NumberFormat("es-ES").format(global[i].TotalDeaths)}</p>
                            <p class="sub-text">deaths</p>
                        </div>
                    </div>
                </div>`;
        }

        counter = counter + max;
        $('#put-countries').append(html2)
    }
}

function changed_query() {
    axios.get('/filter', { params: { value: $('#check').val() } })
        .then(function (response) {
            global = response.data;
            let html = ''
            for (let i = 0; i < 24; i++) {
                html +=
                    `<div class="container-country">
                            <div style="display: flex; align-items: center; margin-top: -5px;">
                                <img src=${response.data[i].Flag} class="img-logo2">
                                <p class="title">${response.data[i].Country}</p>
                            </div>
                            <div class="container-data2">
                                <div>
                                    <p class="upper-text">+${new Intl.NumberFormat("es-ES").format(response.data[i].NewConfirmed)}</p>
                                    <p class="text">${new Intl.NumberFormat("es-ES").format(response.data[i].TotalConfirmed)}</p>
                                    <p class="sub-text">cases</p>
                                </div>
                                <div>
                                    <p class="upper-text">+${new Intl.NumberFormat("es-ES").format(response.data[i].NewRecovered)}</p>
                                    <p class="text">${new Intl.NumberFormat("es-ES").format(response.data[i].TotalRecovered)}</p>
                                    <p class="sub-text">recovered</p>
                                </div>
                                <div>
                                    <p class="upper-text">+${new Intl.NumberFormat("es-ES").format(response.data[i].NewDeaths)}</p>
                                    <p class="text">${new Intl.NumberFormat("es-ES").format(response.data[i].TotalDeaths)}</p>
                                    <p class="sub-text">deaths</p>
                                </div>
                            </div>
                        </div>`;
            }

            document.getElementById('put-countries').innerHTML = html;
            counter = 24;
        })
        .catch(function (error) {
            console.log(error);
        });
}
