const global = {
    currentPage: window.location.pathname,
    region: ['africa', 'americas', 'asia', 'europe', 'oceania'],
};

//fetch Data from API
async function fetchAPIData(endpoint) {
    const overlay = document.querySelector('.overlay');
    const loading = document.querySelector('.spinner-box');
    overlay.classList.add('show');
    loading.classList.add('show');
    const API_URL = `https://restcountries.com/v3.1/${endpoint}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    
    overlay.classList.remove('show');
    loading.classList.remove('show');
    
    return data;
}

//Get country region and display
async function displayRandomCountry() {
    const randomRegion = global.region[Math.floor(Math.random()* 5)];
    const countryContainer = document.querySelector('.country-wrapper');
    const results = await fetchAPIData('all');
    results.forEach(item => {
        if (item.region.toLowerCase() == randomRegion) {
            const mainDiv = document.createElement('div');
            mainDiv.classList.add('country');
            mainDiv.innerHTML = `
                <a href="country-details.html?id=${item.name.common}">
                    <img class="country-flag" src="https://flagcdn.com/${item.cca2.toLowerCase()}.svg" alt="${item.flags.alt}">
                </a>
                <div class="country-details">
                    <p class="country-name">${item.name.common}</p>
                    <p class="country-population">Population: <span>${item.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>
                    <p class="country-region">Region: <span>${item.region}</span></p>
                    <p class="country-capital">Capital: <span>${item.capital[0]}</span></p>
                </div>
            `;

            countryContainer.appendChild(mainDiv);
            
        }  else {
            return;
        }
    });
}

//Get Border Countries
function getBorderCountries(results) {
    
    const borderCountries = [];
    if(results.hasOwnProperty('borders')){
        results.borders.forEach(country => {
            borderCountries.push(country);
        });
    } else {
        return borderCountries;
    }
    return borderCountries;
}

//Display Country Details
async function displayCountryDetails() {
    const countryID = window.location.search.split('=')[1].toLowerCase();
    const results = await fetchAPIData(`name/${countryID}?fullText=true`);
    document.title = ` ${results[0].name.common}`;
    
    // console.log(borders);
    const countryContainer = document.querySelector('.country-container');
    const div = document.createElement('div');
    div.classList.add('country');
    const currencyName = Object.keys(results[0].currencies)[0];

    const languages = [];
    for(const lang in results[0].languages) {
        languages.push(`${results[0].languages[lang]}`);
    };

    div.innerHTML = `
    <img class="country-flag" src="https://flagcdn.com/${results[0].cca2.toLowerCase()}.svg" alt="${results[0].flags.alt}">
            <div class="country-details-container">
                <p class="country-name">${results[0].name.common}</p>
                <div class="country-details-all">
                    <div class="country-details">
                        <p class="country-native-name">Native Name: <span>${results[0].name.common}</span></p>
                        <p class="country-population">Population: <span>${results[0].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>
                        <p class="country-region">Region: <span>${results[0].region}</span></p>
                        <p class="country-sub-region">Sub Region: <span>${results[0].subregion}</span></p>
                        <p class="country-capital">Capital: <span>${results[0].capital[0]}</span></p>
                    </div>
                    <div class="country-more-details">
                        <p>Top Level Domain: <span>${results[0].tld[0]}</span></p>
                        <p>Currencies: <span>${results[0].currencies[currencyName].name} (${results[0].currencies[currencyName].symbol})</span></p>
                        <p>Languages: <span>${languages.join(', ')}</span></p>
                    </div>
                </div>
    
            </div>
    `;

    countryContainer.appendChild(div);
    const bordersDiv = document.createElement('div');
    bordersDiv.classList.add('country-borders');
    const p = document.createElement('p');
    p.innerText = 'Border Countries:';
    bordersDiv.appendChild(p);
    async function displayBorderCountries() {
        const borders = await getBorderCountries(results[0]); //Return Array of Borders
        if (borders.length == 0) {
            const noBorder = document.createElement('p');
            noBorder.innerText = 'None: Alone ! ';
            noBorder.classList.add('no-border');
            bordersDiv.appendChild(noBorder);
        } else {
            for(const country of borders) {
                const countriesByCCA3 = await fetchAPIData(`alpha/${country}`);//Return array of country by cca3
                const a = document.createElement('a');
                a.href = `/country-details.html?id=${countriesByCCA3[0].name.common}`;
                a.innerText = `${countriesByCCA3[0].name.common}`;
                bordersDiv.appendChild(a);
            }
        }
    }

    displayBorderCountries();
    const countryMoreDetailsDiv = document.querySelector('.country-details-container');
    countryMoreDetailsDiv.appendChild(bordersDiv);

}


function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displayRandomCountry();
            break;
        case '/country-details.html':
            displayCountryDetails();
            break;
        case '/search.html':
            search();
            break;
    }
}

document.addEventListener('DOMContentLoaded', init);