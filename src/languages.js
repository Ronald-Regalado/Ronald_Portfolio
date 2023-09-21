//const flagsElement = document.getElementsByClassName('flags');
const textsToChange = document.querySelectorAll('[data-section]');
const flagEs = document.getElementById('flag_es');
const flagEn = document.getElementById('flag_en');
const flagEsMobile = document.getElementById('flag_es-mobile');
const flagEnMobile = document.getElementById('flag_en-mobile');
const userLang=navigator.language.substring(0, 2);

//Get json that correspond to language needed
const changeLanguage = async language => {
    const requestJson = await fetch(`./language/${language}.json`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       });
    const texts = await requestJson.json();
    for (const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        textToChange.innerHTML = texts[section][value];
    }    
};
// Get userlang cookie valor
const cookieValor = getCookieByName('userlang');
// Auto change flags and set language when page loads
if(cookieValor){
    if (cookieValor === 'es') {
        flagEs.hidden = true;
        setLanguageWeb("es")
    } else{
        flagEn.hidden = true;
        setLanguageWeb("en")
    }
}
else{
if (userLang === 'es') {
    flagEs.hidden = true;
    setLanguageWeb("es")
} else{
    flagEn.hidden = true;
    setLanguageWeb("en")
}
}
// EventListener to language flags click
document.addEventListener('click', function (event) {
    // If the clicked element does not have and is not contained by an element with the .flags class, ignore it
    if (!event.target.closest('.flags')) return;
    const language = event.target.parentElement.dataset.language;
    setLanguageWeb(language)
});

// Function to change language flags and texts
function setLanguageWeb(language) {
    switch (language) {
        case 'en':
            changeLanguage(language);
            document.documentElement.setAttribute("lang", "en");
            document.cookie = `userlang=en; expires=${new Date(new Date().getTime()+1000*60*60*24*365).toGMTString()}; path=/; domain=wilfre90dev.github.io`;
            if (flagEnMobile != null){
            flagEsMobile.hidden = false
            flagEnMobile.hidden = true;
            }
            flagEs.hidden = false;
            flagEn.hidden = true;
            break;
        case 'es':
            changeLanguage(language);
            document.documentElement.setAttribute("lang", "es");
            document.cookie = `userlang=es; expires=${new Date(new Date().getTime()+1000*60*60*24*365).toGMTString()}; path=/; domain=wilfre90dev.github.io`;
            if (flagEnMobile != null){
                flagEsMobile.hidden = true
                flagEnMobile.hidden = false;
            }
            flagEs.hidden = true;
            flagEn.hidden = false;
            break;
    }
}

function getCookieByName(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookiesArray = decodedCookie.split(';');
    for(let i = 0; i <cookiesArray.length; i++) {
        let cookie = cookiesArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return false;
}
