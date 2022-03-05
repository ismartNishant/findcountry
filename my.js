
function getInputValue() {
    // Selecting the input element and get its value 
    var inputVal = document.getElementById("search").value;
    searchCountry(inputVal)
}

async function searchCountry(country) {
    // API for get requests
    let fetchRes = fetch(`https://restcountries.com/v3.1/name/${country}`);
    // fetchRes is the promise to resolve
    // it by using.then() method
    const data = await fetchRes.then(res => res.json());
    console.log(data)
    // console.log(data[0].name.common);
    // console.log(data[0].name.official)
    // console.log(data[0].flags.png);
    // console.log(data[0].maps.googleMaps);
    // console.log(data[0].languages)
    pushToDom(data);
}

// content to show in dom
function pushToDom(response) {
    //for country borders
    var bor ='';
    response[0].borders.forEach(element => {
         bor += element +",";
    });
     //for languages
    var lang = '';
    var json_data= response[0].languages
    for(var element in json_data)
    {
    lang += json_data[element]+" , ";
    }

     

    let html = `
    <div class="card">
          <img src="${response[0].flags.png}" class="card-img-top" alt="...">
           <div class="card-body">
              <h5 class="card-title">Country :- ${response[0].name.common}</h5>
              <p class="card-text">Official Name :- ${response[0].name.official}</p>
           </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Capital :- ${response[0].capital[0]} </li>
      <li class="list-group-item"><a href=" ${response[0].maps.googleMaps}"> View In <i class='bx bxs-map bx-tada' ></i> Map </a></li>
      <li class="list-group-item">Region :- ${response[0].region} </li>
      <li class="list-group-item">Timezones :- ${response[0].timezones[0]}</li>
      <li class="list-group-item">Borders :- ${bor}</li>
      <li class="list-group-item">Languages :- ${lang} </li>
      <li class="list-group-item">Population :- ${response[0].population}</li>

    </ul>
    </div>`

    let container = document.querySelector('.country');
    container.innerHTML = html;
}


