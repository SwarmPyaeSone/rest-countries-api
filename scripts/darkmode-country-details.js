//for Dark Mode

function toggleDarkMode() {
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const darkBtn = document.querySelector('.dark-btn');
    const headerText = document.querySelector('header h1 a');
    const backBtn = document.querySelector('.back-btn');
    const darkValue = JSON.parse(window.localStorage.getItem('darkMode'));
    const borderCountries = document.querySelectorAll('.country-borders a');

    if (darkValue == false) {
        body.classList.add('bg-dark');
        header.classList.add('header-dark');
        darkBtn.classList.add('dark-btn-dark');
        headerText.classList.add('dark-text');
        backBtn.classList.add('back-btn-dark');
        if(borderCountries.length == 0) {
                const noBorder = document.querySelector('.no-border');
                noBorder.classList.add('border-dark');
        } else {
            borderCountries.forEach(border => border.classList.add('border-dark'));
        }
        darkBtn.innerHTML = `<i class="fas fa-solid fa-sun"></i>    Light Mode`;
        window.localStorage.setItem('darkMode', JSON.stringify(true));
    } else {
        body.classList.remove('bg-dark');
        header.classList.remove('header-dark');
        darkBtn.classList.remove('dark-btn-dark');
        headerText.classList.remove('dark-text');
        backBtn.classList.remove('back-btn-dark');
        if(borderCountries.length == 0) {
            const noBorder = document.querySelector('.no-border');
            noBorder.classList.remove('border-dark');
    } else {
        borderCountries.forEach(border => border.classList.remove('border-dark'));
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
    const headerText = document.querySelector('header h1 a');
    const backBtn = document.querySelector('.back-btn');
    
    if (darkValue == true) {
        body.classList.add('bg-dark');
        header.classList.add('header-dark');
        darkBtn.classList.add('dark-btn-dark');
        headerText.classList.add('dark-text');
        backBtn.classList.add('back-btn-dark');
        darkBtn.innerHTML = `<i class="fas fa-solid fa-sun"></i>    Light Mode`;
        setTimeout(() => {
            const borderCountries = document.querySelectorAll('.country-borders a');
            if(borderCountries.length == 0) {
                    const noBorder = document.querySelector('.no-border');
                    noBorder.classList.add('border-dark');
                } else {
                    borderCountries.forEach(border => border.classList.add('border-dark'));
                }
        }, 1000)
    } 
}
window.addEventListener('load', checkForDarkMode);