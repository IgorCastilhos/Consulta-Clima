/*
    VARIÁVEIS DO HTML
*/

const input = document.querySelector("input");
const button = document.querySelector("button");

/*
    VARIÁVEIS PARA OS OUTROS ITENS
*/

const place = document.querySelector("#place");
const degrees = document.querySelector("#degrees");
const img = document.querySelector("img");
const wind = document.querySelector("#wind");
const content = document.querySelector(".content");

/*
    Para o botão, adicionaremos um event listener ao click que irá verificar
    se tem alguma informação no input, senão ele vai dar um return. Se tiver
    ele vai pra função getDataApi.
*/

button.addEventListener("click", () => {
  if (!input.value) return;

  getDataApi();
});

/*
    Essa função (getDataApi) vai ser assíncrona e declaramos uma variável url
    que vai ter o link da API. Ela vai ter o valor do input, que é a cidade.
    O units metric é para trazer informações de forma mais contraída.
*/

async function getDataApi() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    input.value
  )}&units=metric&appid=926971bc16090338cce75307b09bb509`;
  /*
    Try e catch com um await fetch(url), transformado em Json, então será 
    verificado se existe algum código 404, caso tenha, será dado um alert.
    Se houver outro erro, ele irá cair no catch do tipo error.
    Se estiver tudo certo com a busca, a função loadData será chamada, passando
    a data da API.
  */
  try {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data?.cod && data.cod === "404") {
          return alert("Local não encontrado!");
        }

        loadData(data);
      });
  } catch (error) {
    alert(error);
  }
}

/*
    Para place(lugar): terá um innerHTML onde iremos pegar o name, da cidade e também, o país.
    Para graus: informaremos a temperatura = a math.floor para arredondarmos tudo dentro de main.temp
    Para a img: Será vinculado ao src uma API do OpenWeatherMap, passando qual o ícone referente à cidade filtrada.
    Para o wind: Chamaremos o wind.speed
    O content se tornará display flex pq inicialmente nós o vemos como display none(HTML)
  */
function loadData(data) {
  place.innerHTML = `${data.name}, ${data.sys.country}`;
  degrees.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}° C`;
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  wind.innerHTML = `Vento: ${data.wind.speed} km/h`;
  content.style.display = "flex";
}
