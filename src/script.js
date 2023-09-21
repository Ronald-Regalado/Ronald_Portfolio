
//para cambiar el estilo de la barra de navegacion al hacer scroll
window.addEventListener('scroll', () => {
    let navbar = document.querySelector('#navbar');
    let items = document.querySelectorAll('#list li a');
    let iconChanges = document.querySelectorAll('.change');
    let iconMenu = document.querySelector('#menu i');
    if (window.scrollY < 80 && !(iconMenu.classList.contains('bi-x'))) {
        navbar.classList.remove('solid');
        iconMenu.classList.remove('dark_text')
        iconChanges.forEach(e => {
            e.classList.remove('dark_text');
        })
        items.forEach(e => {
            e.classList.remove('active');
        })
    } else {
        iconMenu.classList.add('dark_text')
        navbar.classList.add('solid');
        iconChanges.forEach(e => {
            e.classList.add('dark_text');
        })
        items.forEach(e => {
            e.classList.add('active');
        })
    }
})
// ir moviendo el modo activo de los enlaces de la barra segun navegues por la pagina
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('#navbarCollapse #list .link a');
    let descriptiveIcons = document.querySelectorAll('.descriptiveIcons i');
    let heading = document.querySelector('.heading');
    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 250;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');
        if (top >= offset && top < offset + height) {
            navLinks.forEach((link, index) => {
                link.classList.remove('active');
                descriptiveIcons[index].classList.remove('active')
                document.querySelector(`#navbarCollapse ul a[href*=${id}]`).classList.add('active');
                document.querySelector(`${'#'+id+'Link'}`).classList.add('active');
            })
        }
    });
})
window.addEventListener('load', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('#navbarCollapse #list .link a');
    let descriptiveIcons = document.querySelectorAll('.descriptiveIcons i');
    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');
        if (top >= offset && top < offset + height) {
            navLinks.forEach((link, index) => {
                link.classList.remove('active');
                descriptiveIcons[index].classList.remove('active')
                document.querySelector(`#navbarCollapse ul a[href*=${id}]`).classList.add('active');
                document.querySelector(`${'#'+id+'Link'}`).classList.add('active');
            })
        }
    });
})
//modificar la barra al usar el boton para desplegar el contenido 
const menu = document.getElementById('menu');
menu.addEventListener('click', () => {
    let iconMenu = menu.querySelector('i');
    let navbar = document.querySelector('#navbar');
    let items = document.querySelectorAll('#list li a');
    let iconChanges = document.querySelectorAll('.change');
    let descriptiveIcons = document.querySelectorAll('.descriptiveIcons');
    let descriptiveText = document.querySelectorAll('.descriptiveText');

    if (iconMenu.classList.contains('bi-x')) {
        navbar.classList.remove('solid');
        iconMenu.classList.remove('dark_text');
        iconChanges.forEach(e => {
            e.classList.remove('dark_text');
        })
        items.forEach(e => {
            e.classList.remove('solid');
        })
        descriptiveIcons.forEach(icon => {
            icon.style.display = 'none';
        })
        descriptiveText.forEach(text => {
            text.style.display = 'none';
        })

    } else {
        navbar.classList.add('solid');
        iconMenu.classList.add('dark_text');
        iconChanges.forEach(e => {
            e.classList.add('dark_text');
        })
        items.forEach(e => {
            e.classList.add('solid');
        })
        descriptiveIcons.forEach(icon => {
            icon.style.display = 'inline'
        })
        descriptiveText.forEach(text => {
            text.style.display = 'inline';
        })

    }
    if (window.scrollY > 80) {
        navbar.classList.add('solid');
        iconMenu.classList.add('text-dark');
    }
    iconMenu.classList.toggle('bi-x')

})
//Contraer la barra de navegacion al cliquear un link
let items = document.querySelectorAll('#list li a');
items.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 1000) {
            menu.click()
        }
    })
})
//pintar los iconos de Skills de manera dinamica
const srcPrincipal = [
    'svg/html.svg',
    'svg/css.svg',
    'svg/javascript.svg',
    'svg/bootstrap.svg',
    'svg/git.svg',
]
const srcSecundary = [
    'svg/nodejs.svg',
    'svg/ngp.svg',
    'svg/python.svg',
    'svg/tailwind-css.svg'
]
const template = document.querySelector('template').content.querySelector('div');
const principalSkills = document.querySelector(`#skills #principal`);
const secundarySkills = document.querySelector(`#skills #secundary`);
const DrawSkills = (src, containerSkills) => {
    let fragment = document.createDocumentFragment();
    src.forEach((path, index) => {
        template.querySelector('img').setAttribute('src', path);
        template.querySelector('img').setAttribute('alt', path.split('/')[1]);
        let img = template.cloneNode(true);
        fragment.appendChild(img)
    })
    containerSkills.appendChild(fragment)
}
DrawSkills(srcPrincipal, principalSkills);
DrawSkills(srcSecundary, secundarySkills);
//Cambiar tema
const themeContainer = document.querySelector('#themeContainer');
const theme = document.querySelector('#changeTheme');
const changeTheme = themeMode => {
    const webStyle = document.querySelector('body');
    switch (themeMode) {
        case 'dark':
            webStyle.classList.add('darkMode');
            theme.classList.remove('bi-moon-stars');
            theme.classList.add('bi-sun');
            document.cookie = `themeMode=dark; expires=${new Date(new Date().getTime()+1000*60*60*24*365).toGMTString()}; path=/;`;
            break;
        case 'light':
            webStyle.classList.remove('darkMode');
            theme.classList.remove('bi-sun');
            theme.classList.add('bi-moon-stars');
            document.cookie = `themeMode=light; expires=${new Date(new Date().getTime()+1000*60*60*24*365).toGMTString()}; path=/;`;
            break;
    }
}
//obtener valor de la cookie de themeMode
const cookieTheme = getCookieByName('themeMode');
if (cookieTheme) {
    if (cookieTheme === 'dark') {
        changeTheme('dark');
    } else {
        changeTheme('light');
    }
}
themeContainer.addEventListener('click', () => {
    if (theme.classList.contains('bi-sun')) {
        changeTheme('light');
    } else {
        changeTheme('dark');
    }

});

function getCookieByName(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookiesArray = decodedCookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
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
//Desargar curriculum
const downlod = document.querySelector('#containerCV');
downlod.addEventListener('click', () => {
    window.open('./CV Ronald Regalado Batista 15_09_2023 12_55_20.pdf', '_blank')
})
//placholder animado
const inputs = document.querySelectorAll('form label input');
inputs.forEach(input => {
    input.addEventListener('focus', e => {
        e.target.parentNode.classList.add('focus');
        e.target.previousElementSibling.classList.add('focus');
    });
    input.addEventListener('blur', e => {
        if (e.target.value.trim().length == 0) {
            e.target.previousElementSibling.classList.remove('focus');
        }
        e.target.parentNode.classList.remove('focus');
    });
});
