async function search(){
    const search = document.getElementById('search');
    const searchURL = new URLSearchParams(window.location.search);
    const searchTerm = searchURL.get('search');
    if(searchTerm !== '' && searchTerm !== null){
        const searchResults = await fetchAPIData(`name/${searchURL.get('search')}`);
        if(searchResults.status == 404) {
            alert('No result found');
            window.location.href = '/';
            return;
        }
        displaySearch(searchResults);
    } else if(searchTerm == '') {
        alert('Enter Search Name');
        search.value = '';
    }
}

function displaySearch(results) {
    const countryContainer = document.querySelector('.country-wrapper');
    // console.log(results)
    results.forEach(item => {
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
    });
}

