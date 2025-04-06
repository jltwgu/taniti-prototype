function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", function () {
  const primaryColor = '#0077b6';
  const surfaceColor = '#ffffff';
  const backgroundColor = '#f7e9c4';

  const header = document.querySelector("header");
  const logo = document.querySelector(".navbar .logo a");
  const navbar = document.querySelector(".navbar");
  const navlinks = document.querySelectorAll(".nav-links a");
  const navWrapper = document.querySelector('.nav-wrapper');

  const showHeaderOnScroll = () => {
    if (window.scrollY > 100) {
      navbar.style.justifyContent = 'space-between';
      header.style.marginTop = 0;

      logo.classList.add('show');
      navlinks.forEach((el) => el.style.color = primaryColor);
      navWrapper.classList.add('shift-right');
    } else {
      navbar.style.justifyContent = 'center';
      header.style.marginTop = '85px';

      logo.classList.remove('show');
      navlinks.forEach((el) => el.style.color = surfaceColor);
      navWrapper.classList.remove('shift-right');
    }
  };

  window.addEventListener("scroll", showHeaderOnScroll);

  requestAnimationFrame(() => {
    const allSections = document.querySelectorAll('main section');
    allSections.forEach((section, index) => {
      if (index < allSections.length - 1) {
        const indicator = document.createElement('div');
        indicator.classList.add('scroll-indicator');
        indicator.innerHTML = '<span class="material-symbols-outlined" style="font-size: 5rem;">keyboard_arrow_down</span>';
        section.appendChild(indicator);
      }
    });
  });

  let isScrolling = false;
  let currentIndex = 0;
  const sections = Array.from(document.querySelectorAll("section"));

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("touchstart", handleTouchStart, { passive: false });
  window.addEventListener("touchmove", handleTouchMove, { passive: false });

  function handleWheel(e) {
    if (isInScrollableSection(e)) return;

    e.preventDefault();
    if (isScrolling) return;

    const delta = e.deltaY;
    if (delta > 0 && currentIndex < sections.length - 1) {
      scrollToSection(currentIndex + 1);
    } else if (delta < 0 && currentIndex > 0) {
      scrollToSection(currentIndex - 1);
    }
  }

  let touchStartY = null;

  function handleTouchStart(e) {
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchMove(e) {
    if (isInScrollableSection(e)) return;

    e.preventDefault();
    if (isScrolling || touchStartY === null) return;

    const deltaY = touchStartY - e.touches[0].clientY;
    if (deltaY > 30 && currentIndex < sections.length - 1) {
      scrollToSection(currentIndex + 1);
    } else if (deltaY < -30 && currentIndex > 0) {
      scrollToSection(currentIndex - 1);
    }
    touchStartY = null;
  }

  function scrollToSection(index) {
    isScrolling = true;
    currentIndex = index;
    sections[currentIndex].scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      isScrolling = false;
    }, 650);
  }

  function isInScrollableSection(e) {
    let el = e.target;
    while (el && el !== document.body) {
      const style = getComputedStyle(el);
      const isScrollableY =
        (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
        el.scrollHeight > el.clientHeight;
      if (isScrollableY) return true;
      el = el.parentElement;
    }
    return false;
  }

  window.onbeforeunload = function () {
    scrollTo(0, 0);
    currentIndex = 0;
  };
});
