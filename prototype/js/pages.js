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