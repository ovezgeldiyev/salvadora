const body = document.body;
const header = document.getElementById("header");

const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");

menuBtn.onclick = () => {
  menu.classList.toggle("active");
  menuBtn.classList.toggle("active");
  header.classList.toggle("active");
  body.classList.toggle("active");
};
const searchMenu = document.getElementById("searchMenu");
if (searchMenu) {
  const searchBtns = document.querySelectorAll(".searchBtn");
  searchBtns.forEach((searchBtn) => {
    const searchClose = document.getElementById("searchClose");
    if (searchBtn) {
      searchBtn.onclick = () => {
        searchBtn.classList.toggle("active");
        searchMenu.classList.toggle("active");
        menu.classList.remove("active");
        menuBtn.classList.remove("active");
        header.classList.add("active");
        body.classList.add("active");
      };
      searchClose.onclick = () => {
        searchBtn.classList.remove("active");
        searchMenu.classList.remove("active");
        body.classList.remove("active");
        header.classList.remove("active");
      };
    }
  });
}

window.onclick = function (event) {
  if (event.target === menu) {
    menu.classList.remove("active");
    menuBtn.classList.remove("active");
    header.classList.remove("active");
    body.classList.remove("active");
  }
};
// scroll start
function scrollFunc() {
  if (window.pageYOffset >= 40) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
window.onscroll = function () {
  scrollFunc();
};
// scroll end
// nav start
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  const menuBtn = document.getElementById("menuBtn");
  const mqMobile = window.matchMedia("(max-width: 1024px)");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      menu.classList.toggle("open");
      if (!menu.classList.contains("open")) {
        const allSubmenus = menu.querySelectorAll("ul ul");
        const allActiveItems = menu.querySelectorAll("li.active");

        allSubmenus.forEach((submenu) => {
          submenu.classList.remove("active");
        });

        allActiveItems.forEach((item) => {
          item.classList.remove("active");
        });
      }
    });
  }

  function handleDesktopDropdowns() {
    const dropdowns = menu.querySelectorAll("li > ul");

    dropdowns.forEach((ul) => {
      const parentLi = ul.parentElement;
      const parentLink = parentLi.querySelector(":scope > a");

      parentLink.removeEventListener("click", mobileLinkHandler);

      ul.parentElement.addEventListener("mouseenter", () => {
        ul.classList.remove("flip-left", "flip-right");
        parentLi.classList.add("active");

        const rect = ul.getBoundingClientRect();

        ul.classList.add("flip-right");

        if (rect.right > window.innerWidth) {
          ul.classList.remove("flip-right");
          ul.classList.add("flip-left");
        }

        if (rect.left < 0) {
          ul.classList.remove("flip-left");
          ul.classList.add("flip-right");
        }
      });

      ul.parentElement.addEventListener("mouseleave", () => {
        ul.classList.remove("flip-left", "flip-right");
        parentLi.classList.remove("active");
      });
    });
  }

  function mobileLinkHandler(e) {
    const parentLi = this.parentElement;
    const submenu = parentLi.querySelector(":scope > ul");
    const chevron = this.querySelector("svg");

    if (submenu) {
      e.preventDefault();

      if (submenu.classList.contains("active")) {
        submenu.classList.remove("active");
        parentLi.classList.remove("active");
      } else {
        const siblingSubmenus = parentLi.parentElement.querySelectorAll(
          ":scope > li > ul.active",
        );
        const siblingActiveItems =
          parentLi.parentElement.querySelectorAll(":scope > li.active");

        siblingSubmenus.forEach((sibling) => {
          if (sibling !== submenu) {
            sibling.classList.remove("active");
          }
        });

        siblingActiveItems.forEach((item) => {
          if (item !== parentLi) {
            item.classList.remove("active");
          }
        });

        submenu.classList.add("active");
        parentLi.classList.add("active");
      }
    }
  }

  function handleMobileDropdowns() {
    const parentItems = menu.querySelectorAll(".nav__inner-links li:has(> ul)");

    parentItems.forEach((li) => {
      const link = li.querySelector(":scope > a");
      const submenu = li.querySelector(":scope > ul");

      li.removeEventListener("mouseenter", null);
      li.removeEventListener("mouseleave", null);

      link.addEventListener("click", mobileLinkHandler);
    });
  }

  function initNavigation() {
    if (mqMobile.matches) {
      handleMobileDropdowns();
    } else {
      handleDesktopDropdowns();
    }
  }

  document.addEventListener("click", (e) => {
    if (
      menu.classList.contains("open") &&
      !menu.contains(e.target) &&
      e.target !== menuBtn
    ) {
      menu.classList.remove("open");
      const allSubmenus = menu.querySelectorAll("ul ul");
      const allActiveItems = menu.querySelectorAll("li.active");

      allSubmenus.forEach((submenu) => {
        submenu.classList.remove("active");
      });

      allActiveItems.forEach((item) => {
        item.classList.remove("active");
      });
    }
  });

  initNavigation();
  window.addEventListener("resize", initNavigation);
});
// nav end

// lang start
document.addEventListener("DOMContentLoaded", function () {
  const langComponents = document.querySelectorAll(".lang");
  const languageNames = {
    EN: "En",
    DE: "DE",
    CS: "CS",
  };

  function setLanguage(langCode) {
    langComponents.forEach((comp) => {
      const btn = comp.querySelector(".lang__btn b");
      btn.textContent = langCode; // 👈 always 2-letter code
      comp.classList.remove("open");
    });

    localStorage.setItem("siteLang", langCode);
  }

  langComponents.forEach((comp) => {
    const btn = comp.querySelector(".lang__btn");
    const options = comp.querySelectorAll(".lang__menu button");

    btn.addEventListener("click", () => {
      comp.classList.toggle("open");
    });

    options.forEach((opt) => {
      opt.addEventListener("click", () => {
        const isNav = comp.closest(".nav__inner-foot") !== null;
        setLanguage(opt.getAttribute("data-lang"), isNav);
      });
    });
  });

  document.addEventListener("click", (e) => {
    langComponents.forEach((comp) => {
      if (!comp.contains(e.target)) {
        comp.classList.remove("open");
      }
    });
  });

  const saved = localStorage.getItem("siteLang");
  if (saved) {
    langComponents.forEach((comp) => {
      const isNav = comp.closest(".nav__inner-foot") !== null;
      const btn = comp.querySelector(".lang__btn b");
      if (isNav) {
        btn.textContent = languageNames[saved] || saved;
      } else {
        btn.textContent = saved;
      }
    });
  } else {
    const defaultLang = "EN";
    langComponents.forEach((comp) => {
      const isNav = comp.closest(".nav__inner-foot") !== null;
      const btn = comp.querySelector(".lang__btn b");
      if (isNav) {
        btn.textContent = languageNames[defaultLang];
      } else {
        btn.textContent = defaultLang;
      }
    });
  }
});
// lang end

// tab start
const tabBtn = document.querySelectorAll(".tabBtn");
const tabEvent = document.querySelectorAll(".tabEvent");
tabBtn.forEach((e) => {
  onTabClick(tabBtn, tabEvent, e);
});
function onTabClick(tabBtns, tabItems, item) {
  item.addEventListener("click", function (e) {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute("data-tab");
    let currentTab = document.querySelector(tabId);
    if (currentBtn.classList.contains("active")) {
      const faq = currentBtn.parentElement.querySelector(".tabEvent");
      if (faq) {
        faq.classList.remove("active");
        currentBtn.classList.remove("active");
      }
    } else if (!currentBtn.classList.contains("active")) {
      tabBtns.forEach(function (item) {
        item.classList.remove("active");
      });

      tabItems.forEach(function (item) {
        item.classList.remove("active");
      });
      currentBtn.classList.add("active");
      currentTab.classList.add("active");
    }
  });
}
// tab end

// faq start
const faqBtn = document.querySelectorAll(".faqBtn");
const faqEvent = document.querySelectorAll(".faqEvent");
faqBtn.forEach((e) => {
  onFaqClick(faqBtn, faqEvent, e);
});
function onFaqClick(faqBtns, faqItems, item) {
  item.addEventListener("click", function (e) {
    let currentBtn = item;
    let faqId = currentBtn.getAttribute("data-faq");
    let currentTab = document.querySelector(faqId);
    if (currentBtn.classList.contains("active")) {
      const faq = currentBtn.parentElement.querySelector(".faqEvent");
      if (faq) {
        faq.classList.remove("active");
        currentBtn.classList.remove("active");
      }
    } else if (!currentBtn.classList.contains("active")) {
      faqBtn.forEach(function (item) {
        item.classList.remove("active");
      });

      faqItems.forEach(function (item) {
        item.classList.remove("active");
      });
      currentBtn.classList.add("active");
      currentTab.classList.add("active");
    }
  });
}
// faq end
