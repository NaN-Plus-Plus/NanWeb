document.querySelectorAll('.menu button').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 200);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const menuButtons = document.querySelectorAll(".menu button");
  const logo = document.getElementById("logo");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  const pages = {
    welcome: `<h2>Witamy na stronie<br> koła NaN</h2>`,

    info: `<h1>INFO</h1><hr><p><strong>Hej! Szukasz miejsca, gdzie pasja do technologii spotyka się z ambitnymi projektami? Trafiłeś idealnie!</strong>
           <br><br>Nan++ (Not a Number++) to koło naukowe dla studentów UG, dla których informatyka to coś więcej niż studiowanie. To grupa zapaleńców, którzy razem tworzą, eksperymentują z technologiami i rozwijają się. Stawiamy na konkretne działania i realne efekty, które wzbogacą Twoje portfolio.
           <br><br>Wiemy, jak to jest. Myślisz: "brzmi fajnie, ale...". To, że to czytasz i Cię to zainteresowało, nie jest przypadkiem. Nie pozwól, żeby strach lub wątpliwości powstrzymały Ciebie od dołączenia do nas. Nie ważne, jaki jest Twój wydział lub poziom zaawansowania. Nasza ekipa jest przygotowana na osoby z każdym poziomem (no, może oprócz tych, którzy są już od nas lepsi).
           <br><br>Nie musisz czekać na idealny moment, dołącz do nas teraz! Zawsze znajdziemy sposób, żeby wciągnąć Ciebie w nasze obecne działania.
           <br><br><strong>Pozdrawiamy,
           <br>Ekipa NaN++ ;]</strong></p>`,

    projekty:  `<h1>PROJEKTY</h1><hr>
                <div class="project" onclick="window.open('/archiwum.html', '_blank')">
                <div class="overlay"><span>Archiwum</span></div></div>
                <!--<div class="project" onclick="window.open('/project1.html', '_blank')">
                <img src="/img/placeholder.png" alt="Project 1">
                <div class="overlay"><span>Projekt 1</span></div></div>-->`,

    aktualnosci: `<h1>AKTUALNOŚCI</h1><hr>
                  <section class="updates">
                  <div class="update-list">
                  <div class="update">
                  <div class="update-header">
                  <span class="update-title">Pierwsze spotkanie</span>
                  <span class="arrow">▼</span></div>
                  <div class="update-content">
                  <p>Serdecznie zapraszamy na pierwsze spotkanie koła.<br><br>Kiedy: 18.11.2025 o 16.15 <br> Gdzie: sala 3.13</p>
                  </div></div></section>
    
                  <section class="updates">
                  <div class="update-list">
                  <div class="update">
                  <div class="update-header">
                  <span class="update-title">Spotkanie organizacyjne</span>
                  <span class="arrow">▼</span></div>
                  <div class="update-content">
                  <p>Serdecznie zapraszamy na spotkanie organizacyjne odrestaurowanego koła Nan++ :]<br><br>Kiedy: 13.11.2025 o 16.15 <br> Gdzie: sala 1.18</p>
                  </div></div></section>`,

    grafik: `<h1>GRAFIK</h1><hr><br>
             <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTvSsCxtWgxzPq3UKUHIDSIBlP8SQc7px8XsQhOzmitiiitusalgGbn4nX3L-4WNrQC4bcBy6CA4C4l/pubhtml?widget=true&amp;headers=false" width="900" height="550"></iframe>`,

    kontakt: `<h1>KONTAKT</h1><hr><p>Dołącz do nas!
              <br><br>Masz pytania? Chcesz się przywitać? A może od razu chcesz dołączyć? Śmiało, napisz do nas! Jesteśmy tu:</p>
              <br><div class="info"><p><strong>E-mail:</strong><a href="mailto:nanplusplus@studms.ug.edu.pl" target="_blank"><img src="/img/icons/email.png" width="5%" height="5%"></a></p></div>
              <div class="info"><p><strong>Discord:</strong><a href="https://discord.gg/Vk3N6xtBrq" target="_blank"><img src="/img/icons/discord.png" width="5%" height="5%"></a></p></div>
              <div class="info"><p><strong>Instagram:</strong><a href="https://www.instagram.com/nanplusplus/" target="_blank"><img src="/img/icons/instagram.png" width="5%" height="5%"></a></p></div>
              <div class="info"><p><strong>Facebook:</strong><a href="https://www.facebook.com/share/1CnGTb1qGf/" target="_blank"><img src="/img/icons/facebook.png" width="5%" height="5%"></a></p></div>
              <div class="info"><p><strong>Github:</strong><a href="https://github.com/sparrow0p/NaNPlusPlus/" target="_blank"><img src="/img/icons/github.png" width="5%" height="5%"></a></p></div>
              <br><p>© 2026 Koło Naukowe NaN++</p>`
  };

  function createContentSymbols() {
    
    const existingSymbols = content.querySelectorAll('.content-symbol');
    existingSymbols.forEach(symbol => symbol.remove());

    const symbols = ['/img/blue.svg', '/img/pink.svg'];
    const symbolCount = 35;

    for (let i = 0; i < symbolCount; i++) {
      const symbol = document.createElement('img');
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      
      symbol.src = randomSymbol;
      symbol.className = 'content-symbol';
      symbol.alt = '';
      
      const posX = Math.random() * 95;
      const posY = Math.random() * 95;
      
      const size = 15 + Math.random() * 25;
      const delay = Math.random() * 8;
      const duration = 1.5 + Math.random() * 3;
      
      symbol.style.left = `${posX}%`;
      symbol.style.top = `${posY}%`;
      symbol.style.width = `${size}px`;
      symbol.style.animationDelay = `${delay}s`;
      symbol.style.animationDuration = `${duration}s`;
      
      content.appendChild(symbol);
    }
  }

  function initializeUpdates() {
  document.querySelectorAll('.update-header').forEach(header => {
    header.replaceWith(header.cloneNode(true));
  });

  document.querySelectorAll('.update-header').forEach(header => {
    header.addEventListener('click', handleUpdateClick);
  });
}

  function handleUpdateClick(e) {
  e.preventDefault();
  e.stopPropagation();
  toggleUpdate(e.currentTarget);
}

  function toggleUpdate(header) {
  const update = header.parentElement;
  update.classList.toggle('open');
}

  function changeContent(newContent) {
    content.classList.add("fade-out");

    setTimeout(() => {
      content.innerHTML = newContent;
      content.classList.remove("fade-out");
      content.classList.add("fade-in");
      
      setTimeout(() => {
      if (newContent === pages.welcome) {
      createContentSymbols();
      }}, 20);
      
      if (newContent.includes("update-header")) {
        initializeUpdates();
      }

      setTimeout(() => {
        content.classList.remove("fade-in");
      }, 400);
    }, 300);
  }
  
  changeContent(pages.welcome);

  menuButtons.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("data-page");
      changeContent(pages[page]);
      if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        burger.classList.remove("active");
      }
    });
  });

  logo.addEventListener("click", () => {
    changeContent(pages.welcome);
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
      burger.classList.remove("active");
    }
  });

  burger.addEventListener("click", () => {
    menu.classList.toggle("open");
    burger.classList.toggle("active");
  });
});
