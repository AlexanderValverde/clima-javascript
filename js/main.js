const content = document.querySelector('.content');
const resultClima = document.querySelector('#resultClima');
const form = document.querySelector('#form');

window.addEventListener('load', () => {
    form.addEventListener('submit', searchForWeather);
});

function searchForWeather(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        alert('Debes llenar los campos que son obligatorios');
        return
    }

    consultAPI(ciudad, pais);
}

function consultAPI(ciudad, pais) {
    const apiKey = '58826343e1e6a9c581865022fb62cfa3';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}&units=metric`;
    console.log(url);

    cleanUp();

    fetch(url)
        .then(resultClima => resultClima.json())
        .then(dataWeather => {
            if (dataWeather.cod === '404') {
                alert('Ciudad no encontrada, intente de nuevo...');
                return
            }
            showWeather(dataWeather);
        });
}

const convCelsius = grados => parseInt(grados - 273.15);

function showWeather(dataWeather) {
    const {name, main: {temp, temp_min, temp_max, humidity }} = dataWeather;

    const nameCity = document.createElement('p');
    nameCity.textContent = `El clima en ${name}`;
    nameCity.classList.add('cityText');

    const actual = document.createElement('p');
    actual.innerHTML = ` ${temp} °C`;
    actual.classList.add('celsius');

    const tempMax = document.createElement('p');
    tempMax.innerHTML= `Temperatura máxima: ${temp_max} ℃`;
    tempMax.classList.add('max');

    const tempMin = document.createElement('p');
    tempMin.innerHTML= `Temperatura mínima: ${temp_min} ℃`;
    tempMin.classList.add('min');

    const hume = document.createElement('p');
    hume.innerHTML= `Humedad: ${humidity}%`;
    hume.classList.add('humedad');

    const img = document.createElement('image');
    img.innerHTML = "<img src='./img/cloudy-day.png'>";
    img.classList.add('img');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('resultadoClima');
    
    const resultadoClimaGeneral = document.createElement('div');
    resultadoClimaGeneral.classList.add('resultadoClimaGeneral');

    resultadoDiv.appendChild(nameCity);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);
    resultadoDiv.appendChild(hume);

    resultadoClimaGeneral.appendChild(img);
    resultadoClimaGeneral.appendChild(resultadoDiv);


    resultClima.appendChild(resultadoClimaGeneral);
}

function cleanUp(params) {
    while (resultClima.firstChild) {
        resultClima.removeChild(resultClima.firstChild);
    }
}