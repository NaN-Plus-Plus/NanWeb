document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const menuButtons = document.querySelectorAll(".menu button");
  const logo = document.getElementById("logo");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  const updateItem = (title, body) => `
    <div class="update">
      <div class="update-header">
        <span class="update-title">${title}</span>
        <span class="arrow">▼</span>
      </div>
      <div class="update-content"><p>${body}</p></div>
    </div>`;

  const contactItem = (label, href, icon) => `
    <div class="info"><p><strong>${label}:</strong>
      <a href="${href}" target="_blank" rel="noopener"><img src="/img/icons/${icon}.png" alt="${label}"></a>
    </p></div>`;

  const pages = {
    welcome: `<h2>Witamy na stronie<br> koła NaN</h2>`,

    info: `<h1>INFO</h1><hr><p><strong>Hej! Szukasz miejsca, gdzie pasja do technologii spotyka się z ambitnymi projektami? Trafiłeś idealnie!</strong>
           <br><br>Nan++ (Not a Number++) to koło naukowe dla studentów UG, dla których informatyka to coś więcej niż studiowanie. To grupa zapaleńców, którzy razem tworzą, eksperymentują z technologiami i rozwijają się. Stawiamy na konkretne działania i realne efekty, które wzbogacą Twoje portfolio.
           <br><br>Wiemy, jak to jest. Myślisz: "brzmi fajnie, ale...". To, że to czytasz i Cię to zainteresowało, nie jest przypadkiem. Nie pozwól, żeby strach lub wątpliwości powstrzymały Ciebie od dołączenia do nas. Nie ważne, jaki jest Twój wydział lub poziom zaawansowania. Nasza ekipa jest przygotowana na osoby z każdym poziomem (no, może oprócz tych, którzy są już od nas lepsi).
           <br><br>Nie musisz czekać na idealny moment, dołącz do nas teraz! Zawsze znajdziemy sposób, żeby wciągnąć Ciebie w nasze obecne działania.
           <br><br><strong>Pozdrawiamy,
           <br>Ekipa NaN++ ;]</strong></p>`,

    projekty: `<h1>PROJEKTY</h1><hr>
      <div class="projects-container">
        <a class="project" href="/PanicAtTheDisco.html" target="_blank" rel="noopener">
          <div class="overlay"><span>Panic! At The Disco</span></div>
        </a>
      </div>`,

    aktualnosci: `<h1>AKTUALNOŚCI</h1><hr>
      <section class="updates">
        <div class="update-list">
          ${updateItem("Pierwsze spotkanie w roku 2026", "Zapraszamy na pierwsze spotkanie koła w tym roku!<br><br>Kiedy: 22.11.2026 o 10:00 <br> Gdzie: sala 2.05")}
          ${updateItem("Pierwsze spotkanie koła", "Serdecznie zapraszamy na pierwsze spotkanie koła.<br><br>Kiedy: 18.11.2025 o 16.15 <br> Gdzie: sala 3.13")}
          ${updateItem("Spotkanie organizacyjne", "Serdecznie zapraszamy na spotkanie organizacyjne odrestaurowanego koła Nan++ :]<br><br>Kiedy: 13.11.2025 o 16.15 <br> Gdzie: sala 1.18")}
        </div>
      </section>`,

    grafik: `<h1>GRAFIK</h1><hr>
      <a class="sheet-link" href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTvSsCxtWgxzPq3UKUHIDSIBlP8SQc7px8XsQhOzmitiiitusalgGbn4nX3L-4WNrQC4bcBy6CA4C4l/pubhtml" target="_blank" rel="noopener">Otwórz grafik w nowej karcie ↗</a>
      <div class="sheet-wrap">
        <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTvSsCxtWgxzPq3UKUHIDSIBlP8SQc7px8XsQhOzmitiiitusalgGbn4nX3L-4WNrQC4bcBy6CA4C4l/pubhtml?widget=true&amp;headers=false" loading="lazy"></iframe>
      </div>`,

    kontakt: `<h1>KONTAKT</h1><hr>
      <p>Dołącz do nas!<br><br>Masz pytania? Chcesz się przywitać? A może od razu chcesz dołączyć? Śmiało, napisz do nas! Jesteśmy tu:</p><br>
      ${contactItem("E-mail", "mailto:nanplusplus@studms.ug.edu.pl", "email")}
      ${contactItem("Discord", "https://discord.gg/zrScvMRZRR", "discord")}
      ${contactItem("Instagram", "https://www.instagram.com/nanplusplus/", "instagram")}
      ${contactItem("Facebook", "https://www.facebook.com/share/1CnGTb1qGf/", "facebook")}
      ${contactItem("Github", "https://github.com/NaN-Plus-Plus", "github")}
      <br><p>© 2026 Koło Naukowe NaN++</p>`
  };

  function createContentSymbols() {
    content.querySelectorAll(".content-symbol").forEach(symbol => symbol.remove());

    const symbols = ["/img/blue.svg", "/img/pink.svg"];

    for (let i = 0; i < 35; i++) {
      const symbol = document.createElement("img");
      symbol.src = symbols[Math.floor(Math.random() * symbols.length)];
      symbol.className = "content-symbol";
      symbol.alt = "";
      symbol.style.left = `${Math.random() * 95}%`;
      symbol.style.top = `${Math.random() * 95}%`;
      symbol.style.width = `${15 + Math.random() * 25}px`;
      symbol.style.animationDelay = `${Math.random() * 8}s`;
      symbol.style.animationDuration = `${1.5 + Math.random() * 3}s`;
      content.appendChild(symbol);
    }
  }

  function setActiveButton(page) {
    menuButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.page === page));
  }

  function closeMenu() {
    menu.classList.remove("open");
    burger.classList.remove("active");
  }

  function changeContent(page) {
    content.classList.add("fade-out");
    setActiveButton(page);

    setTimeout(() => {
      content.innerHTML = pages[page];
      content.classList.toggle("is-welcome", page === "welcome");
      content.classList.remove("fade-out");

      if (page === "welcome") {
        createContentSymbols();
      }
    }, 300);
  }

  content.addEventListener("click", e => {
    const header = e.target.closest(".update-header");
    if (header) {
      header.parentElement.classList.toggle("open");
    }
  });

  menuButtons.forEach(button => {
    button.addEventListener("click", () => {
      changeContent(button.dataset.page);
      closeMenu();
    });
  });

  logo.addEventListener("click", () => {
    changeContent("welcome");
    closeMenu();
  });

  burger.addEventListener("click", () => {
    menu.classList.toggle("open");
    burger.classList.toggle("active");
  });

  changeContent("welcome");

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const plusAssets = ["/img/blue.svg", "/img/pink.svg"];
    let lastSpawn = 0;
    let plusIndex = 0;

    document.addEventListener("pointermove", event => {
      if (event.pointerType === "touch") return;
      const now = performance.now();
      if (now - lastSpawn < 48) return;
      lastSpawn = now;

      const plus = document.createElement("img");
      plus.src = plusAssets[plusIndex++ % plusAssets.length];
      plus.alt = "";
      plus.className = "mouse-plus";
      plus.style.left = `${event.clientX}px`;
      plus.style.top = `${event.clientY}px`;
      plus.style.setProperty("--plus-size", `${12 + Math.random() * 13}px`);
      plus.style.setProperty("--drift-x", `${Math.round(Math.random() * 54 - 27)}px`);
      plus.style.setProperty("--spin", `${Math.round(Math.random() * 90 - 45)}deg`);
      document.body.appendChild(plus);
      plus.addEventListener("animationend", () => plus.remove(), { once: true });
    }, { passive: true });
  }
});