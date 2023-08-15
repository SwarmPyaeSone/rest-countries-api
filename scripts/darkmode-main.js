//for Dark Mode

function toggleDarkMode() {
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const darkBtn = document.querySelector('.dark-btn');
    const searchInput = document.querySelector('#search');
    const filter = document.querySelector('.filter');
    const dropdown = document.querySelector('.filter-dropdown');
    const liElements = document.querySelectorAll('.li-elements');
    const countryContainer = document.querySelectorAll('.country');
    const headerLink = document.querySelector('header h1 a');
    
    const darkValue = JSON.parse(window.localStorage.getItem('darkMode'));
    
    if (darkValue == false) {
        body.classList.add('bg-dark');
        header.classList.add('header-dark');
        darkBtn.classList.add('dark-btn-dark');
        searchInput.classList.add('search-dark');
        if(filter !== null && filter !== undefined){
            filter.classList.add('filter-dark');
            dropdown.classList.add('filter-dropdown-dark');
            liElements.forEach(li => li.classList.add('li-elements-dark'));
        }
        countryContainer.forEach(country => country.classList.add('country-dark'));
        if(headerLink !== undefined || headerLink !== null) {
            headerLink.classList.add('header-link-dark');
        }
        darkBtn.innerHTML = `<i class="fas fa-solid fa-sun"></i>    Light Mode`;
        window.localStorage.setItem('darkMode', JSON.stringify(true));
    } 
    else {
        body.classList.remove('bg-dark');
        header.classList.remove('header-dark');
        darkBtn.classList.remove('dark-btn-dark');
        searchInput.classList.remove('search-dark');
        if(filter !== null && filter !== undefined){
            filter.classList.remove('filter-dark');
            dropdown.classList.remove('filter-dropdown-dark');
            liElements.forEach(li => li.classList.remove('li-elements-dark'));
        }
        countryContainer.forEach(country => country.classList.remove('country-dark'));
        if(headerLink !== undefined && headerLink !== null) {
            headerLink.classList.remove('header-link-dark');
        }
        darkBtn.innerHTML = `<i class="fas fa-solid fa-moon"></i>    Dark Mode`;
        window.localStorage.setItem('darkMode', JSON.stringify(false));
    }
}


const darkBtn = document.querySelector('.dark-btn');
darkBtn.addEventListener('click', toggleDarkMode);

function checkForDarkMode() {
    const darkValue = JSON.parse(window.localStorage.getItem('darkMode'));

    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const darkBtn = document.querySelector('.dark-btn');
    const searchInput = document.querySelector('#search');
    const filter = document.querySelector('.filter');
    const dropdown = document.querySelector('.filter-dropdown');
    const liElements = document.querySelectorAll('.li-elements');
    const headerLink = document.querySelector('header h1 a');

    if (darkValue == true) {
        body.classList.add('bg-dark');
        header.classList.add('header-dark');
        darkBtn.classList.add('dark-btn-dark');
        searchInput.classList.add('search-dark');
        if(filter !== null && filter !== undefined){
            filter.classList.add('filter-dark');
            dropdown.classList.add('filter-dropdown-dark');
            liElements.forEach(li => li.classList.add('li-elements-dark'));
        }
        
        if(headerLink !== undefined && headerLink !== null) {
            headerLink.classList.add('header-link-dark');
        }
        setTimeout(() => document.querySelectorAll('.country').forEach(country => country.classList.add('country-dark')), 1000);
        darkBtn.innerHTML = `<i class="fas fa-solid fa-sun"></i>    Light Mode`;
    } 
}
window.addEventListener('load', checkForDarkMode);