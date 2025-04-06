document.addEventListener("DOMContentLoaded", () => {
  const sections = Array.from(document.querySelectorAll("main > section"));
  const navLinks = document.querySelectorAll("nav > a");
  let isScrolling = false;


  const url = window.location.href.split("#");
  const destinationId = url[1];

  let currentIndex = 0;

  if (destinationId !== undefined) {
    const destination = document.querySelector(`#${destinationId}`);
    const index = sections.indexOf(destination);

    currentIndex = index;
  }



  function scrollToSection(index) {
    if (index >= 0 && index <= sections.length) {
      isScrolling = true;
      currentIndex = index;
      sections[index].scrollIntoView({behavior: "smooth"})

      const navLinks = document.querySelectorAll('header nav:not(.navbar-toggle) a');

      const navbarToggle = document.querySelector('.navbar-toggle');

      const color = index === 0 ? 'var(--color-surface)' : 'var(--color-primary)';
    
      navLinks.forEach(link => {
        link.style.color = color;
      });

      navbarToggle.style.backgroundColor = index === 0 ? 'transparent' : 'var(--color-highlight)';
    

      setTimeout(() => {
        isScrolling = false;
      }, 400);
    }

  }

  function handleScroll(e) {
    if (isScrolling) return;
    e.preventDefault();
    const delta = e.deltaY;
    if(delta > 0 && currentIndex < sections.length - 1) {
      scrollToSection(currentIndex + 1);
    } else if (delta < 0 && currentIndex > 0) {
      scrollToSection(currentIndex - 1);
    }
  }

  function handleNavClick(e) {
    e.preventDefault();

    const url = e.target.href.split("#");
    const destinationId = url[1];

    const destination = document.querySelector(`#${destinationId}`);

    const index = sections.indexOf(destination);
    scrollToSection(index);
  }

  navLinks.forEach((element) => {
    if (element.innerHTML !== 'Contact Us') {
      element.addEventListener("click", handleNavClick);
    }
  }); 


  const backToTop = document.querySelector(".back-to-top-button");

  backToTop.addEventListener("click", handleNavClick);


  window.addEventListener("wheel", handleScroll, { passive: false });

  window.onbeforeunload = function () {
    scrollTo(0,0);
    currentIndex = 0;
  }
});

function toggleMenu() {
  document.getElementById("dropdownMenu").classList.toggle("show");
}

window.addEventListener("click", function (e) {
  const menu = document.getElementById("dropdownMenu");
  const button = document.querySelector(".menu-toggle");
  if (!menu.contains(e.target) && !button.contains(e.target)) {
    menu.classList.remove("show");
  }
});
