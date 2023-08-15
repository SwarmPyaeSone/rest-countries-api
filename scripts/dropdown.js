const dropdown = document.querySelector('.filter-container');
const dropdownList = document.querySelector('.filter-dropdown');

function showDropdown() {
    dropdownList.classList.toggle('show');
}

dropdown.addEventListener('click', showDropdown);

const lists = document.querySelectorAll('.filter-dropdown li');

lists.forEach(li => 
    {
    li.addEventListener('click', filterByRegion(li.innerText));
});


function filterByRegion(currentRegion) {
    return async function () {
        const countriesByRegion = await fetchAPIData(`region/${currentRegion}`);
        const countryContainer= document.querySelector('.country-wrapper');
        countryContainer.innerHTML = '';
        countriesByRegion.forEach(item => {
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

                checkForDarkMode();
        });
}
}